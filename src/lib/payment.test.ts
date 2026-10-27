import { describe, expect, it } from 'vitest';
import type { PaymentDetailsFragment } from '../gql/graphql';
import { describePaymentMethod, summarizePayment } from './payment';

const card: PaymentDetailsFragment = {
  __typename: 'Payment',
  id: 'pay_1',
  status: 'CAPTURED',
  method: 'card',
  last4: '4242',
  amount: 47.62,
  capturedAt: '2026-09-02T15:04:05.000Z',
};

describe('payment', () => {
  it('describes card payments by last four digits', () => {
    expect(describePaymentMethod(card)).toBe('Card ending in 4242');
  });

  it('summarizes status, amount, and method', () => {
    expect(summarizePayment(card)).toBe('Charged $47.62 · Card ending in 4242');
  });
});
