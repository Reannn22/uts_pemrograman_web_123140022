import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {state.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Items ({state.totalItems})</span>
              <span>${state.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="btn btn-primary w-full mb-2"
          >
            Checkout
          </button>
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="btn btn-secondary w-full"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
