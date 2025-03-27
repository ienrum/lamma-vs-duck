import HomePageTopbar from "@/src/page/home/home-page.topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <HomePageTopbar />
      {children}
    </div>
  );
};

export default Layout;
