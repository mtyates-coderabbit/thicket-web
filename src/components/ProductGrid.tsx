import { useMutation, useQuery } from '@apollo/client';
import { AddToCartDocument, ProductsDocument } from '../gql/graphql';
import { SESSION } from '../lib/apollo';
import { formatMoney } from '../lib/money';

export function ProductGrid() {
  const { data, loading, error } = useQuery(ProductsDocument);
  const [addToCart, { loading: adding }] = useMutation(AddToCartDocument);

  if (loading) return <p className="muted">Loading products…</p>;
  if (error) return <p className="error">{error.message}</p>;

  return (
    <div className="grid">
      {data?.products.map((product) => (
        <article key={product.id} className="card">
          <h3>{product.name}</h3>
          <p className="muted">{product.description}</p>
          <div className="row">
            <strong>{formatMoney(product.price)}</strong>
            <button
              disabled={!product.inStock || adding}
              onClick={() => addToCart({ variables: { cartId: SESSION.cartId, productId: product.id, quantity: 1 } })}
            >
              {product.inStock ? 'Add to cart' : 'Out of stock'}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
