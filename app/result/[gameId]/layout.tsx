import Head from 'next/head';

const Layout = async ({ children, params }: { children: React.ReactNode; params: Promise<{ gameId: string }> }) => {
  const { gameId } = await params;
  return (
    <>
      <Head>
        <title>Game Result - Lamma vs Duck</title>
        <meta name="description" content="Check your game results and compare with other players" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://lamma-vs-duck.vercel.app/result/${gameId}`} />
        <meta property="og:title" content="Game Result - Lamma vs Duck" />
        <meta property="og:description" content="Check your game results and compare with other players" />
        <meta property="og:image" content="https://lamma-vs-duck.vercel.app/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://lamma-vs-duck.vercel.app/result/${gameId}`} />
        <meta property="twitter:title" content="Game Result - Lamma vs Duck" />
        <meta property="twitter:description" content="Check your game results and compare with other players" />
        <meta property="twitter:image" content="https://lamma-vs-duck.vercel.app/og-image.png" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
