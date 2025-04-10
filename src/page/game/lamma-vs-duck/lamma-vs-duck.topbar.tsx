import { TopBar } from "@/src/widgets/TopBar/ui/TopBar";

const LammaVsDuckTopbar = () => {
  return (
    <TopBar>
      <TopBar.Left>
        <TopBar.BackButton />
      </TopBar.Left>
      <TopBar.Center>
        <TopBar.Title text={"게임"} />
      </TopBar.Center>
      <TopBar.Right>
        <TopBar.HelpButton />
        <TopBar.StatsLink />
        <TopBar.ProfileLink />
      </TopBar.Right>
    </TopBar>
  );
};

export default LammaVsDuckTopbar;
