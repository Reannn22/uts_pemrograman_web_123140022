import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <button
          onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
          className="btn btn-primary mt-2 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};
