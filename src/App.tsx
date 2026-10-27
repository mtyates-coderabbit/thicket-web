import { useState } from 'react';
import { CartPanel } from './components/CartPanel';
import { OrderDetail } from './components/OrderDetail';
import { OrderHistory } from './components/OrderHistory';
import { ProductGrid } from './components/ProductGrid';

type View = { name: 'shop' } | { name: 'orders' } | { name: 'order'; id: string };

export function App() {
  const [view, setView] = useState<View>({ name: 'shop' });
  const showOrder = (id: string) => setView({ name: 'order', id });

  return (
    <div className="app">
      <header className="topbar">
        <h1>Thicket</h1>
        <nav>
          <button className={view.name === 'shop' ? 'active' : ''} onClick={() => setView({ name: 'shop' })}>
            Shop
          </button>
          <button className={view.name !== 'shop' ? 'active' : ''} onClick={() => setView({ name: 'orders' })}>
            Orders
          </button>
        </nav>
      </header>
      <main>
        {view.name === 'shop' && (
          <div className="layout">
            <ProductGrid />
            <CartPanel onViewOrder={showOrder} />
          </div>
        )}
        {view.name === 'orders' && <OrderHistory onSelect={showOrder} />}
        {view.name === 'order' && <OrderDetail id={view.id} onBack={() => setView({ name: 'orders' })} />}
      </main>
    </div>
  );
}
