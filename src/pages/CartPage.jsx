import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const handleRemoveFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen w-full py-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className={`flex items-center gap-4 p-4 rounded-lg animate-pulse ${
                  isDark ? 'bg-gray-800' : 'bg-gray-100'
                }`}
              >
                <div className={`w-20 h-20 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                <div className="flex-grow space-y-2">
                  <div className={`h-4 w-2/3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  <div className={`h-4 w-1/3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                </div>
                <div className={`w-24 h-8 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
          <div className={`rounded-lg h-48 animate-pulse ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`} />
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className={`min-h-screen w-full py-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your cart is empty
          </h2>
          <Link 
            to="/products" 
            className={`inline-block px-8 py-3 rounded-lg transition-colors ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full py-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className={`text-2xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Shopping Cart ({state.items.length})
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {state.items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                isDark={isDark}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
              />
            ))}
          </div>
          <CartSummary isDark={isDark} />
        </div>
      </div>
    </div>
  );
}
