import PropTypes from 'prop-types';

export default function CartSummary({ totalItems, totalPrice, onCheckout, onClearCart }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow h-fit">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Items ({totalItems})</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="btn btn-primary w-full mb-2"
      >
        Checkout
      </button>
      <button
        onClick={onClearCart}
        className="btn btn-secondary w-full"
      >
        Clear Cart
      </button>
    </div>
  );
}

CartSummary.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired
};
