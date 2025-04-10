import HomePage from '../home.page';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TOPBAR_TITLE } from '../constants/page';
import Providers from '@/src/app/provider/tanstack-query.provider';


describe('HomePage', () => {
  it('should render title and button', () => {
    render(<HomePage />, { wrapper: ({ children }) => <Providers>{children}</Providers> });

    // 타이틀 확인
    expect(screen.getByText(TOPBAR_TITLE)).toBeDefined();
  });
});
