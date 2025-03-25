import HomePage from '../home.page';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';

describe('HomePage', () => {
  it('should render', () => {
    render(<HomePage />);
    expect(screen.getByText('Lamma vs Duck')).toBeDefined();
  });
});
