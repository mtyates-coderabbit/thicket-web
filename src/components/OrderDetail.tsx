import { useMutation, useQuery } from '@apollo/client';
import { OrderDetailDocument, RefundOrderDocument } from '../gql/graphql';
import { formatMoney } from '../lib/money';
import { canRequestRefund } from '../lib/orderStatus';
import { summarizePayment } from '../lib/payment';
import { StatusBadge } from './StatusBadge';

export function OrderDetail({ id, onBack }: { id: string; onBack: () => void }) {
  const { data, loading, error } = useQuery(OrderDetailDocument, { variables: { id } });
  const [refund, refundResult] = useMutation(RefundOrderDocument);

  if (loading) return <p className="muted">Loading order…</p>;
  if (error) return <p className="error">{error.message}</p>;
  const order = data?.order;
  if (!order) return <p className="muted">Order not found.</p>;

  const money = (amount: number) => formatMoney(amount, order.currency);

  return (
    <section>
      <button className="link" onClick={onBack}>
        ← All orders
      </button>
      <header className="row">
        <h2>Order {order.number}</h2>
        <StatusBadge status={order.status} />
      </header>

      <table className="table">
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td className="num">
                {item.quantity} × {money(item.unitPrice)}
              </td>
              <td className="num">{money(item.lineTotal)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Subtotal</td>
            <td className="num">{money(order.subtotal)}</td>
          </tr>
          <tr>
            <td colSpan={2}>Tax</td>
            <td className="num">{money(order.tax)}</td>
          </tr>
          <tr>
            <th colSpan={2}>Total</th>
            <th className="num">{money(order.totalAmount)}</th>
          </tr>
        </tfoot>
      </table>

      <div className="panel">
        <h3>Payment</h3>
        <p>{summarizePayment(order.payment, order.currency)}</p>
        {order.payment.status === 'AUTHORIZED' && <p className="muted">Your card will be charged when the order ships.</p>}
      </div>

      {order.shippingAddress && (
        <div className="panel">
          <h3>Shipping to</h3>
          <address>
            {order.shippingAddress.line1}
            {order.shippingAddress.line2 && <>, {order.shippingAddress.line2}</>}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.region} {order.shippingAddress.postalCode}
          </address>
        </div>
      )}

      {canRequestRefund(order.status) && (
        <button disabled={refundResult.loading} onClick={() => refund({ variables: { orderId: order.id } })}>
          Refund order
        </button>
      )}
      {refundResult.error && <p className="error">{refundResult.error.message}</p>}
    </section>
  );
}
