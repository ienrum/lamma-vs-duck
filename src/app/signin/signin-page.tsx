import { signinAction } from '@/src/shared/api/actions/signin-action';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';
import { GoogleSignInButton } from '@/src/shared/ui/google-signin-button';

export default function SignInPage() {
  return (
    <form action={signinAction} className="mt-8 space-y-6 p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <GoogleSignInButton type="submit" className="w-full border-none shadow-xl" />
        </CardContent>
      </Card>
    </form>
  );
}
