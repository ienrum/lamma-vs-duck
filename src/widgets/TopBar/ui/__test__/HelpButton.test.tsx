import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HelpButton } from '../HelpButton';
import { GAME_RULE_SCRIPT, GAME_RULE_TITLE } from '@/src/app/config/game-rule';
describe('HelpButton', () => {
  it('should render', () => {
    render(<HelpButton gameRuleTitle={GAME_RULE_TITLE} gameRuleScript={GAME_RULE_SCRIPT} />);
  });

  it('should render the help dialog', () => {
    render(<HelpButton gameRuleTitle={GAME_RULE_TITLE} gameRuleScript={GAME_RULE_SCRIPT} />);
    const button = screen.getAllByTestId('dialog-trigger')[0];
    fireEvent.click(button);

    expect(screen.getAllByText(GAME_RULE_TITLE)).toBeDefined();
  });
});
