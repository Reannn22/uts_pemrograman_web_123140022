import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { dispatch } = useCart();

  const updateQuantity = (quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
      <div className="flex-grow">
        <h3 className="font-medium">{item.title}</h3>
        <p className="text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => updateQuantity(item.quantity - 1)}
          className="btn btn-secondary px-2 py-1"
        >
          -
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.quantity + 1)}
          className="btn btn-secondary px-2 py-1"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
        className="text-red-500 hover:text-red-700"
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
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
