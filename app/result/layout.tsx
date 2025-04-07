import ResultPageTopbar from "@/src/page/result/result-page.topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <ResultPageTopbar />
      {children}
    </div>
  );
};

export default Layout;
