import { TopBar } from "@/src/widgets/TopBar/ui/TopBar";
import { TOPBAR_TITLE } from "./constants/topbar";

const HomePageTopbar = () => {
  return (
    <TopBar>
      <TopBar.Center>
        <TopBar.Title text={TOPBAR_TITLE} />
      </TopBar.Center>
      <TopBar.Right>
        <TopBar.HelpButton />
        <TopBar.StatsLink />
        <TopBar.ProfileLink />
      </TopBar.Right>
    </TopBar>
  );
};

export default HomePageTopbar;