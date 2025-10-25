import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { state, dispatch } = useCart();

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-6">Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary mt-4 px-8">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {state.items.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveFromCart}
            />
          ))}
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
