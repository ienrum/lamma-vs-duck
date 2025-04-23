import { TopBar } from '@/src/widgets/TopBar/ui/TopBar';
import { TOPBAR_TITLE } from './constants/topbar';

const ProfilePageTopbar = () => {
  return (
    <TopBar>
      <TopBar.Left>
        <TopBar.BackButton />
      </TopBar.Left>
      <TopBar.Center>
        <TopBar.Title text={TOPBAR_TITLE} />
      </TopBar.Center>
      <TopBar.Right>
        <TopBar.StatsLink />
      </TopBar.Right>
    </TopBar>
  );
};

export default ProfilePageTopbar;
