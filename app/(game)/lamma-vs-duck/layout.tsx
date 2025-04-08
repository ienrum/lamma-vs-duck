import LammaVsDuckTopbar from "@/src/page/game/lamma-vs-duck/lamma-vs-duck.topbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <LammaVsDuckTopbar />
      <div className="py-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;