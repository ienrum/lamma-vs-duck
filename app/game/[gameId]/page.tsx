import FenseWallPage from '@/src/page/game/fense-wall/fense-wall.page';
import LammaVsDuckPage from '@/src/page/game/lamma-vs-duck/lamma-vs-duck.page';

const Page = async ({ params }: { params: Promise<{ gameId: string }> }) => {
  const { gameId } = await params;
  if (gameId === '1') {
    return <LammaVsDuckPage />;
  } else if (gameId === '2') {
    return <FenseWallPage />;
  }
  return null;
};

export default Page;
