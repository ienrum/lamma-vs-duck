'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CredentialResponse {
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            nonce: string;
            use_fedcm_for_prompt: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface OneTapComponentProps {
  onLoginSuccess?: (user: any) => void;
  onLoginError?: (error: any) => void;
}

const OneTapComponent: React.FC<OneTapComponentProps> = ({ onLoginSuccess, onLoginError }) => {
  const supabase = createClient();
  const router = useRouter();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return [nonce, hashedNonce];
  };

  useEffect(() => {
    // Load Google One Tap script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google One Tap script loaded');
      setIsScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isScriptLoaded) return;

    const initializeGoogleOneTap = async () => {
      console.log('Initializing Google One Tap');
      const [nonce, hashedNonce] = await generateNonce();
      console.log('Nonce: ', nonce, hashedNonce);

      // check if there's already an existing session before initializing the one-tap UI
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session', error);
        onLoginError?.(error);
      }
      if (data.session) {
        onLoginSuccess?.(data.session.user);
        return;
      }

      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: CredentialResponse) => {
          try {
            // send id token returned in response.credential to supabase
            const { data, error } = await supabase.auth.signInWithIdToken({
              provider: 'google',
              token: response.credential,
              nonce,
            });

            if (error) throw error;
            console.log('Session data: ', data);
            console.log('Successfully logged in with Google One Tap');

            // 로그인 성공 시 콜백 호출
            onLoginSuccess?.(data.user);
          } catch (error) {
            console.error('Error logging in with Google One Tap', error);
            onLoginError?.(error);
          }
        },
        nonce: hashedNonce,
        // with chrome's removal of third-party cookies, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
        use_fedcm_for_prompt: true,
      });
      window.google.accounts.id.prompt(); // Display the One Tap UI
    };

    initializeGoogleOneTap();
  }, [isScriptLoaded, onLoginSuccess, onLoginError]);

  return <div id="oneTap" className="fixed top-0 right-0 z-[100]" />;
};

export default OneTapComponent;
