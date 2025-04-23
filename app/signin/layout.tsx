const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col gap-4">
      <div className="flex w-full justify-center p-4">{children}</div>
    </div>
  );
};

export default Layout;
