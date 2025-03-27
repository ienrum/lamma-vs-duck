import { render, screen } from '@testing-library/react';
import { TopBar } from '../TopBar';
import { expect, describe, it } from 'vitest';

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

  it('ProfileLink가 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <TopBar.ProfileLink />
      </TopBar>
    );

    const profileLink = screen.getAllByRole('link')[0];
    expect(profileLink).toBeDefined();
  });

  it('HelpButton이 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <TopBar.HelpButton />
      </TopBar>
    );

    const helpButton = screen.getAllByRole('button')[0];
    expect(helpButton).toBeDefined();
  });

  it('StatsLink가 렌더링되어야 합니다', () => {
    render(
      <TopBar>
        <TopBar.StatsLink />
      </TopBar>
    );

    const statsLink = screen.getAllByRole('link')[0];
    expect(statsLink).toBeDefined();
  });
}); 