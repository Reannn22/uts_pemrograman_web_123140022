import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item, isDark }) {
  const { dispatch } = useCart();

  const updateQuantity = (quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-lg border ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
      <div className="flex-grow">
        <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {item.title}
        </h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          ${item.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => updateQuantity(item.quantity - 1)}
          className={`px-2 py-1 rounded ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          -
        </button>
        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
          {item.quantity}
        </span>
        <button 
          onClick={() => updateQuantity(item.quantity + 1)}
          className={`px-2 py-1 rounded ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          +
        </button>
      </div>
      <button 
        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
        className={`transition-colors ${
          isDark 
            ? 'text-red-400 hover:text-red-300' 
            : 'text-red-500 hover:text-red-700'
        }`}
      >
        Remove
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    // Optional fields
    description: PropTypes.string,
    brand: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired
};
