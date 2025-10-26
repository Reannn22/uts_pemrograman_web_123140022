import { useCart } from '../../context/CartContext';
import { useMemo } from 'react';

export default function CartSummary({ isDark }) {
  const { state } = useCart();

  const { totalItems, totalPrice, totalWithTax } = useMemo(() => {
    const totalItems = state.items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
    const totalPrice = state.items.reduce((sum, item) => sum + (item?.price || 0) * (item?.quantity || 0), 0);
    const totalWithTax = totalPrice * 1.1; // 10% tax

    return {
      totalItems: totalItems || 0,
      totalPrice: totalPrice || 0,
      totalWithTax: totalWithTax || 0
    };
  }, [state.items]);

  return (
    <div className={`sticky top-24 rounded-lg p-6 ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    } border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Items ({totalItems})
          </span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Tax (10%)
          </span>
          <span>${(totalPrice * 0.1).toFixed(2)}</span>
        </div>
        
        <div className="h-px my-4 -mx-6 bg-gray-200 dark:bg-gray-700" />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalWithTax.toFixed(2)}</span>
        </div>
      </div>
      
      <button className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors ${
        isDark 
          ? 'bg-blue-600 hover:bg-blue-700 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}>
        Checkout
      </button>
    </div>
  );
}
