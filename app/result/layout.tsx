import ResultPageTopbar from "@/src/page/result/result-page.topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ResultPageTopbar />
      <div className="flex flex-col gap-4 max-w-screen-lg mx-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;
