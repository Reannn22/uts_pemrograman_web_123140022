import { useState, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProductDetailPage() {
  const quantityInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);

  // Memoize total price calculation
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * quantity;
  }, [product, quantity]);

  // Memoize handlers
  const handleQuantityChange = useCallback((delta) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    }
  }, [product, quantity, dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-primary-600"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl font-bold text-primary-600">${product.price}</p>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{product.rating}</span>
          </div>
          <p className="text-gray-600">{product.description}</p>
          <div className="flex items-center gap-2 my-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="btn btn-secondary"
            >
              -
            </button>
            <input
              ref={quantityInputRef}
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
              min="1"
              max="10"
              className="input w-20"
            />
            <button
              onClick={() => handleQuantityChange(1)}
              className="btn btn-secondary"
            >
              +
            </button>
          </div>
          <p className="text-xl font-bold text-primary-600 mb-4">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="btn btn-primary w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
