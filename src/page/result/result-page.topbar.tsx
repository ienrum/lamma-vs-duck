import { TopBar } from "@/src/widgets/TopBar/ui/TopBar";
import { RESULT_TITLE } from './constants/result';

const ResultPageTopbar = () => {
  return (
    <TopBar>
      <TopBar.Left>
        <TopBar.BackButton />
      </TopBar.Left>
      <TopBar.Center>
        <TopBar.Title text={RESULT_TITLE} />
      </TopBar.Center>
      <TopBar.Right>
        <TopBar.HelpButton />
        {/* <TopBar.ProfileLink /> */}
      </TopBar.Right>
    </TopBar>
  );
};

export default ResultPageTopbar;