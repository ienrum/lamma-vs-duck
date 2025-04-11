import HomePage from '../home.page';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TOPBAR_TITLE } from '../constants/page';
import Providers from '@/src/app/provider/tanstack-query.provider';

// useRouter 모킹
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// useFocusStore 모킹
vi.mock('@/src/shared/model/focus.store', () => ({
  useFocusStore: () => ({
    focus: vi.fn(),
  }),
}));

// useUser 모킹
vi.mock('@/src/shared/api/use-user', () => ({
  useUser: () => ({
    user: null,
  }),
}));

// useGetGameList 모킹
vi.mock('@/src/features/game/api/use-get-game-list', () => ({
  default: () => ({
    data: [],
    isLoading: false,
    error: null,
  }),
}));

// useGetPlayToday 모킹
vi.mock('@/src/features/game/api/use-get-play-today', () => ({
  default: () => ({
    data: false,
    isLoading: false,
    error: null,
  }),
}));

describe('HomePage', () => {
  it('should render title and button', () => {
    render(<HomePage />, { wrapper: ({ children }) => <Providers>{children}</Providers> });

    // 타이틀 확인
    expect(screen.getByText(TOPBAR_TITLE)).toBeDefined();
  });
});
