'use client';

import { useUser } from '@/src/shared/api/use-user';
import CarrockScene from '@/src/widgets/carrock/ui/carrock-scene';
import { Suspense } from 'react';
import Spinner from '@/components/ui/spinner';

const CarrockPage = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Suspense fallback={<Spinner size="lg" />}>
        <CarrockScene isAuthenticated={isAuthenticated} />
      </Suspense>
    </div>
  );
};

export default CarrockPage;