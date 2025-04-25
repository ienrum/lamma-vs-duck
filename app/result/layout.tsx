import ResultPageTopbar from '@/src/page/result/result-page.topbar';
import Script from 'next/script';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Google tag (gtag.js) event */}
      <Script id="gtag-event">
        {`
        gtag('event', 'conversion_event_page_view', {
          // <event_parameters>
        });
      `}
      </Script>

      <ResultPageTopbar />
      <div className="mx-auto flex max-w-screen-lg flex-col gap-4">{children}</div>
    </>
  );
};

export default Layout;
