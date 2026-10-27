import type { PaymentDetailsFragment } from '../gql/graphql';
import { formatMoney } from './money';

export function describePaymentMethod(payment: PaymentDetailsFragment): string {
  if (payment.method === 'card') return `Card ending in ${payment.last4 ?? '••••'}`;
  if (payment.method === 'paypal') return 'PayPal';
  return payment.method;
}

const STATUS_LABELS: Record<PaymentDetailsFragment['status'], string> = {
  AUTHORIZED: 'Authorized',
  CAPTURED: 'Charged',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
};

/** One-line summary used on order confirmation and detail views. */
export function summarizePayment(payment: PaymentDetailsFragment, currency = 'USD'): string {
  return `${STATUS_LABELS[payment.status]} ${formatMoney(payment.amount, currency)} · ${describePaymentMethod(payment)}`;
}
