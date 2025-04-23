'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/src/shared/ui/button';
import { useUser } from '@/src/shared/api/use-user';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';
import { useState } from 'react';
import { BASE_URL } from '@/src/app/config/baseurl';

const ProfilePage = () => {
  const { user, error } = useUser();

  if (error) {
    throw new Error(error.message);
  }

  const [name, setName] = useState(user.name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`${BASE_URL}/api/user`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex w-full flex-col gap-4 md:flex-row" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <div className="flex gap-2">
              <Input type="text" className="w-full" value={name} onChange={(e) => setName(e.target.value)} />
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
