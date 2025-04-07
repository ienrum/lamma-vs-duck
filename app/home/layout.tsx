import HomePageTopbar from "@/src/page/home/home-page.topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HomePageTopbar />
      {children}
    </>
  );
};

export default Layout;
