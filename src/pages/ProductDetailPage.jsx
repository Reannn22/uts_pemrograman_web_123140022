import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/dummyApi';
import { useCart } from '../context/CartContext';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className="container mx-auto px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-primary-600 hover:text-primary-700"
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
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            className="btn btn-primary w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
