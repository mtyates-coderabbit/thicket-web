import { describe, expect, it } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
  it('formats dollar amounts', () => {
    expect(formatMoney(47.62)).toBe('$47.62');
    expect(formatMoney(1234.5)).toBe('$1,234.50');
  });

  it('formats zero', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });
});
