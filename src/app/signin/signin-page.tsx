import { signinAction } from '@/src/shared/api/actions/signin-action';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GoogleSignInButton } from '@/src/shared/ui/google-signin-button';

export default function SignInPage() {
  return (
    <form action={signinAction} className="mt-8 w-full space-y-6 p-4">
      <Card className="mx-auto w-full">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <GoogleSignInButton type="submit" className="flex justify-center border-none shadow-xl" />
        </CardContent>
      </Card>
    </form>
  );
}
