import ProfilePage from '@/src/page/profile/profile.page';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePage />
    </Suspense>
  );
};

export default Page;
