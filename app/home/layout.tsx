import HomePageTopbar from '@/src/page/home/home-page.topbar';
import Head from 'next/head';
import Script from 'next/script';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Google tag (gtag.js) event */}
      <Script id="gtag-event">
        {`
        gtag('event', 'ads_conversion__https_lamma_vs_duck_ve_2', {
          // <event_parameters>
        });
      `}
      </Script>

      <HomePageTopbar />
      <div className="mx-auto flex max-w-screen-lg flex-col gap-4">{children}</div>
    </>
  );
};

export default Layout;
