import HomePage from '../home.page';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { TOPBAR_TITLE } from '../constants/page';

describe('HomePage', () => {
  it('should render', () => {
    render(<HomePage />);
    expect(screen.getByText(TOPBAR_TITLE)).toBeDefined();
  });
});
