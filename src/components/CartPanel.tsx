import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { CartDocument, CheckoutDocument, OrderHistoryDocument, RemoveFromCartDocument } from '../gql/graphql';
import { SESSION } from '../lib/apollo';
import { formatMoney } from '../lib/money';
import { summarizePayment } from '../lib/payment';

const SHIPPING_ADDRESS = {
  line1: '742 Alder Street',
  city: 'Portland',
  region: 'OR',
  postalCode: '97205',
  country: 'US',
};

export function CartPanel({ onViewOrder }: { onViewOrder: (id: string) => void }) {
  const { data, loading } = useQuery(CartDocument, { variables: { id: SESSION.cartId } });
  const [removeFromCart] = useMutation(RemoveFromCartDocument);
  const [cardToken, setCardToken] = useState('tok_visa_4242');
  const [checkout, result] = useMutation(CheckoutDocument, {
    refetchQueries: [CartDocument, OrderHistoryDocument],
  });

  const cart = data?.cart;
  const confirmation = result.data?.checkout;

  return (
    <aside className="panel">
      <h2>Cart</h2>
      {loading && <p className="muted">Loading…</p>}
      {cart && cart.items.length === 0 && <p className="muted">Your cart is empty.</p>}
      {cart && cart.items.length > 0 && (
        <>
          <ul className="lines">
            {cart.items.map((item) => (
              <li key={item.product.id}>
                <span>
                  {item.quantity} × {item.product.name}
                </span>
                <span>{formatMoney(item.lineTotal)}</span>
                <button
                  className="link"
                  onClick={() => removeFromCart({ variables: { cartId: SESSION.cartId, productId: item.product.id } })}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="row">
            <span>Subtotal</span>
            <strong>{formatMoney(cart.subtotal)}</strong>
          </p>
          <label className="field">
            Card
            <select value={cardToken} onChange={(e) => setCardToken(e.target.value)}>
              <option value="tok_visa_4242">Visa ending 4242</option>
              <option value="tok_mastercard_4444">Mastercard ending 4444</option>
            </select>
          </label>
          <button
            className="primary"
            disabled={result.loading}
            onClick={() =>
              checkout({
                variables: {
                  input: { cartId: SESSION.cartId, email: SESSION.email, shippingAddress: SHIPPING_ADDRESS, cardToken },
                },
              })
            }
          >
            {result.loading ? 'Placing order…' : 'Place order'}
          </button>
        </>
      )}
      {result.error && <p className="error">{result.error.message}</p>}
      {confirmation && (
        <div className="confirmation">
          <p>
            Order <strong>{confirmation.order.number}</strong> placed — {formatMoney(confirmation.order.total)}
          </p>
          <p className="muted">{summarizePayment(confirmation.payment, confirmation.order.currency)}</p>
          <button className="link" onClick={() => onViewOrder(confirmation.order.id)}>
            View order
          </button>
        </div>
      )}
    </aside>
  );
}
