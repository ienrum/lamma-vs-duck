import HomePageTopbar from "@/src/page/home/home-page.topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomePageTopbar />
      <div className="flex flex-col gap-4 max-w-screen-lg mx-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;
