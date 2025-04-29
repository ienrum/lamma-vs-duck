'use client';

import { signinAction, devSigninAction } from '@/src/shared/api/actions/signin-action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleSignInButton } from '@/src/shared/ui/google-signin-button';
import { Logo } from '@/src/shared/ui/logo';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function SignInPage() {
  const [isDev, setIsDev] = useState(false);

  useEffect(() => {
    // 클라이언트 사이드에서 개발 환경인지 확인
    setIsDev(process.env.NODE_ENV === 'development');
  }, []);

  return (
    <div className="from-background to-secondary/30 flex min-h-screen items-center justify-center bg-gradient-to-b p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md space-y-6">
        <Card className="glass-effect pearl-shadow overflow-hidden rounded-2xl border-none">
          <CardHeader className="space-y-6 pb-6">
            <div className="flex justify-center">
              <Logo size="lg" className="animate-pulse-slow" />
            </div>
            <div className="space-y-3 text-center">
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <p className="text-muted-foreground text-sm">Sign in to continue to your account</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-5 p-6">
            <form action={signinAction} className="w-full">
              <GoogleSignInButton type="submit" className="pearl-hover w-full rounded-xl" />
            </form>

            {isDev && (
              <form action={devSigninAction} className="w-full">
                <Button type="submit" variant="outline" className="border-primary/50 w-full rounded-xl border-dashed">
                  Dev Mode: Quick Login
                </Button>
              </form>
            )}

            <p className="text-muted-foreground px-2 text-center text-xs">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
