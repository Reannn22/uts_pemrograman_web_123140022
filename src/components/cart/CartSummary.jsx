import { useCart } from '../../context/CartContext';

export default function CartSummary() {
  const { totalItems, totalPrice, totalWithTax } = useCart();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Items ({totalItems})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax (10%)</span>
          <span>${(totalWithTax - totalPrice).toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${totalWithTax.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
