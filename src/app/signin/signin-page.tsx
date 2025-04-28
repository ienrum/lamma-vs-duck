import { signinAction } from '@/src/shared/api/actions/signin-action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleSignInButton } from '@/src/shared/ui/google-signin-button';
import { Logo } from '@/src/shared/ui/logo';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8">
      <form action={signinAction} className="w-full max-w-md space-y-4 sm:space-y-6">
        <Card className="border-none shadow-lg">
          <CardHeader className="space-y-4 pb-4 sm:pb-6">
            <div className="flex justify-center">
              <Logo size="lg" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-center text-xl font-semibold text-gray-900 sm:text-2xl">
                Welcome Back
              </CardTitle>
              <p className="text-center text-xs text-gray-500 sm:text-sm">Sign in to continue to your account</p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-3 sm:space-y-4">
            <GoogleSignInButton type="submit" className="w-full" />
            <p className="px-2 text-center text-[10px] text-gray-500 sm:text-xs">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
