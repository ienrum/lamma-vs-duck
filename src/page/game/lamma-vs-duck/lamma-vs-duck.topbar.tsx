import { TopBar } from '@/src/widgets/TopBar/ui/TopBar';
import { GAME_TITLE } from './constants/game';

const LammaVsDuckTopbar = () => {
  return (
    <TopBar>
      <TopBar.Left>
        <TopBar.BackButton />
      </TopBar.Left>
      <TopBar.Center>
        <TopBar.Title text={GAME_TITLE} />
      </TopBar.Center>
      <TopBar.Right>
        <TopBar.ProfileLink />
      </TopBar.Right>
    </TopBar>
  );
};

export default LammaVsDuckTopbar;
