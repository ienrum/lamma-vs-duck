import { render, screen } from '@testing-library/react';
import { TopBar } from '../TopBar';
import { expect, describe, it } from 'vitest';
import { GAME_RULE_SCRIPT, GAME_RULE_TITLE } from '@/src/app/config/game-rule';
import { HelpButton } from '../HelpButton';
import { StatsLink } from '../StatsLink';

describe('TopBar', () => {
  it('기본 레이아웃이 올바르게 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <TopBar.Left>Left Content</TopBar.Left>
        <TopBar.Center>Center Content</TopBar.Center>
        <TopBar.Right>Right Content</TopBar.Right>
      </TopBar>
    );

    expect(screen.getByText('Left Content')).toBeDefined();
    expect(screen.getByText('Center Content')).toBeDefined();
    expect(screen.getByText('Right Content')).toBeDefined();
  });

  it('Title 컴포넌트가 올바르게 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <TopBar.Title text="테스트 타이틀" />
      </TopBar>
    );

    expect(screen.getByText('테스트 타이틀')).toBeDefined();
  });

  it('BackButton이 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <TopBar.BackButton />
      </TopBar>
    );

    const backButton = screen.getAllByRole('button')[0];
    expect(backButton).toBeDefined();
  });

  it('HelpButton이 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <HelpButton gameRuleTitle={GAME_RULE_TITLE} gameRuleScript={GAME_RULE_SCRIPT} />
      </TopBar>
    );

    const helpButton = screen.getAllByRole('button')[0];
    expect(helpButton).toBeDefined();
  });

  it('StatsLink가 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <StatsLink gameId="1" />
      </TopBar>
    );

    const statsLink = screen.getAllByRole('link')[0];
    expect(statsLink).toBeDefined();
  });
});
