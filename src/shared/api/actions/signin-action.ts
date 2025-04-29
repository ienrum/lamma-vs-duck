'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signinAction = async () => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    },
  });

  if (error) {
    console.error(error);
  }

  if (data.url) {
    redirect(data.url);
  }
};

// 개발 환경에서만 사용할 테스트 계정 로그인 함수
export const devSigninAction = async () => {
  // 개발 환경인지 확인
  if (process.env.NODE_ENV !== 'development') {
    console.error('This function is only available in development mode');
    return;
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    // 개발 환경용 테스트 계정으로 로그인 (이메일/비밀번호가 없는 경우)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: process.env.DEV_USER_EMAIL || 'test@example.com',
      password: process.env.DEV_USER_PASSWORD || 'password123',
    });

    if (error) {
      console.error('Dev signin error:', error);

      // 만약 계정이 없다면, 자동으로 생성 (개발 환경에서만)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: process.env.DEV_USER_EMAIL || 'test@example.com',
        password: process.env.DEV_USER_PASSWORD || 'password123',
        options: {
          data: {
            name: 'Test User',
          },
        },
      });

      if (signUpError) {
        console.error('Failed to create dev account:', signUpError);
        return;
      }

      // 사용자 생성 후 바로 로그인
      await supabase.auth.signInWithPassword({
        email: process.env.DEV_USER_EMAIL || 'test@example.com',
        password: process.env.DEV_USER_PASSWORD || 'password123',
      });
    }
  } catch (err) {
    console.error('Unexpected error during dev signin:', err);
  }
  // 로그인 성공 시 홈페이지로 리다이렉트
  redirect('/home');
};
