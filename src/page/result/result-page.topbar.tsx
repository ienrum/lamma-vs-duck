import { TopBar } from "@/src/widgets/TopBar/ui/TopBar";

const ResultPageTopbar = () => {
  return (
    <TopBar>
      <TopBar.Left>
        <TopBar.BackButton />
      </TopBar.Left>
      <TopBar.Center>
        <TopBar.Title text={"결과"} />
      </TopBar.Center>
      <TopBar.Right>
        <TopBar.HelpButton />
        <TopBar.ProfileLink />
      </TopBar.Right>
    </TopBar>
  );
};

export default ResultPageTopbar;