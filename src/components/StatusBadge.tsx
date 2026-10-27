import type { OrderStatus } from '../gql/graphql';
import { orderStatusLabel, orderStatusTone } from '../lib/orderStatus';

export function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={`badge badge-${orderStatusTone(status)}`}>{orderStatusLabel(status)}</span>;
}
