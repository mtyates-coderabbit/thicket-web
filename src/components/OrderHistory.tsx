import { useQuery } from '@apollo/client';
import { OrderHistoryDocument } from '../gql/graphql';
import { SESSION } from '../lib/apollo';
import { formatMoney } from '../lib/money';
import { StatusBadge } from './StatusBadge';

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

export function OrderHistory({ onSelect }: { onSelect: (id: string) => void }) {
  const { data, loading, error } = useQuery(OrderHistoryDocument, {
    variables: { customerId: SESSION.customerId },
  });

  if (loading) return <p className="muted">Loading orders…</p>;
  if (error) return <p className="error">{error.message}</p>;
  if (!data?.orders.length) return <p className="muted">No orders yet.</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Placed</th>
          <th>Items</th>
          <th>Status</th>
          <th className="num">Total</th>
        </tr>
      </thead>
      <tbody>
        {data.orders.map((order) => (
          <tr key={order.id} onClick={() => onSelect(order.id)} className="clickable">
            <td>{order.number}</td>
            <td>{dateFormat.format(new Date(order.createdAt))}</td>
            <td>{order.items.length}</td>
            <td>
              <StatusBadge status={order.status} />
            </td>
            <td className="num">{formatMoney(order.totalAmount, order.currency)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
