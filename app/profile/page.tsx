import ProfilePage from '@/src/page/profile/profile.page';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfilePage />
    </Suspense>
  );
};

export default Page;
