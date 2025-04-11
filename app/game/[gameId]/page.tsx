import LammaVsDuckPage from "@/src/page/game/lamma-vs-duck/lamma-vs-duck.page";

const Page = async ({ params }: { params: Promise<{ gameId: string }> }) => {
  const { gameId } = await params;
  if (gameId === "1") {
    return <LammaVsDuckPage />;
  }

  return null
};

export default Page;