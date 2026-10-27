import { describe, expect, it } from 'vitest';
import type { OrderStatus } from '../gql/graphql';
import { canRequestRefund, orderStatusLabel, orderStatusTone } from './orderStatus';

const ALL: OrderStatus[] = ['PENDING', 'PAID', 'FULFILLED', 'CANCELLED', 'REFUNDED'];

describe('order status', () => {
  it('labels every status', () => {
    for (const status of ALL) {
      expect(orderStatusLabel(status)).toBeTruthy();
      expect(orderStatusTone(status)).toBeTruthy();
    }
  });

  it('only allows refunds for paid orders', () => {
    expect(ALL.filter(canRequestRefund)).toEqual(['PAID', 'FULFILLED']);
  });
});
