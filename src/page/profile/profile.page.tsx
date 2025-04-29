'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useUser } from '@/src/shared/api/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useUpdateName } from './api/use-update-name';

const ProfilePage = () => {
  const { user, error } = useUser();
  const { mutate, isPending, error: updateNameError } = useUpdateName();

  if (error) {
    throw new Error(error.message);
  }

  const [name, setName] = useState(user.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(name);
  };

  return (
    <div className="from-background to-secondary/30 min-h-screen bg-gradient-to-b py-12">
      <div className="pearl-container max-w-2xl">
        <Card className="glass-effect pearl-shadow overflow-hidden rounded-2xl border-none">
          <CardHeader className="bg-primary/5 space-y-2 border-b px-6 py-8">
            <CardTitle className="text-3xl font-bold">Profile Settings</CardTitle>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Label htmlFor="name" className="text-lg font-medium">
                  Display Name
                </Label>
                <div className="flex gap-4">
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 rounded-xl text-lg"
                    placeholder="Enter your display name"
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="pearl-hover bg-primary rounded-xl px-8 font-semibold"
                  >
                    {isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
                {updateNameError && <p className="text-destructive text-sm">{updateNameError.message}</p>}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
