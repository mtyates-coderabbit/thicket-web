import type { OrderStatus } from '../gql/graphql';

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

function assertNever(value: never): never {
  throw new Error(`Unhandled order status: ${String(value)}`);
}

export function orderStatusLabel(status: OrderStatus): string {
  switch (status) {
    case 'PENDING':
      return 'Awaiting payment';
    case 'PAID':
      return 'Paid';
    case 'FULFILLED':
      return 'Shipped';
    case 'CANCELLED':
      return 'Cancelled';
    case 'REFUNDED':
      return 'Refunded';
    default:
      return assertNever(status);
  }
}

export function orderStatusTone(status: OrderStatus): StatusTone {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'PAID':
      return 'info';
    case 'FULFILLED':
      return 'success';
    case 'CANCELLED':
      return 'neutral';
    case 'REFUNDED':
      return 'danger';
    default:
      return assertNever(status);
  }
}

/** Refunds can be requested for orders that have been paid for. */
export function canRequestRefund(status: OrderStatus): boolean {
  return status === 'PAID' || status === 'FULFILLED';
}
