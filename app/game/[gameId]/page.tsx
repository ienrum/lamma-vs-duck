import FenseWallPage from '@/src/page/game/fense-wall/fense-wall.page';
import LammaVsDuckPage from '@/src/page/game/lamma-vs-duck/lamma-vs-duck.page';
import CarrockPage from '@/src/page/game/carrock/carrock.page';
import { playedToday } from '@/src/entities/game/model';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: Promise<{ gameId: string }> }) => {
  const { gameId } = await params;

  const playedTodayResponse = await playedToday(Number(gameId));

  if (playedTodayResponse.status === 'success' && playedTodayResponse.data) {
    redirect(`/result/${gameId}`);
  } else if (playedTodayResponse.status === 'error') {
    throw new Error(playedTodayResponse.error);
  }

  if (gameId === '1') {
    return <LammaVsDuckPage />;
  } else if (gameId === '2') {
    return <FenseWallPage />;
  } else if (gameId === '3') {
    return <CarrockPage />;
  }
  return null;
};

export default Page;
