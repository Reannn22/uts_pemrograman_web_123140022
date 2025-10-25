import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useMemo, useCallback } from 'react'; // NEW: Add hooks

export default function ProductCard({ product, onAddToCart, onQuickView }) {
  const { dispatch } = useCart();

  // NEW: Calculate discount price with useMemo
  const discountedPrice = useMemo(() => {
    return product.discountPercentage 
      ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
      : product.price;
  }, [product.price, product.discountPercentage]);

  // NEW: Memoize add to cart handler
  const handleAddToCart = useCallback(() => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [dispatch, product]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product.id}`}>
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.title}</h3>
        
        {/* NEW: Add price comparison */}
        <div className="mt-1">
          <span className="text-gray-600 text-lg">${discountedPrice}</span>
          {product.discountPercentage && (
            <span className="text-sm text-gray-400 line-through ml-2">
              ${product.price}
            </span>
          )}
        </div>

        {/* NEW: Add rating */}
        <div className="flex items-center mt-1">
          <span className="text-yellow-400">★</span>
          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn btn-primary mt-2 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// NEW: Enhanced PropTypes validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string,
    rating: PropTypes.number,
    discountPercentage: PropTypes.number,
    category: PropTypes.string,
    brand: PropTypes.string,
    stock: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onQuickView: PropTypes.func
};

ProductCard.defaultProps = {
  onQuickView: undefined
};
