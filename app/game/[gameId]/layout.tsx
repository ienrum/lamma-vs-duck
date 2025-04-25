import LammaVsDuckTopbar from '@/src/page/game/lamma-vs-duck/lamma-vs-duck.topbar';
import Script from 'next/script';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Google tag (gtag.js) event */}
      <Script id="gtag-event">
        {`
        gtag('event', 'gamepage', {
          // <event_parameters>
        });
      `}
      </Script>
      <div>
        <LammaVsDuckTopbar />
        <div className="py-4">{children}</div>
      </div>
    </>
  );
};

export default Layout;
