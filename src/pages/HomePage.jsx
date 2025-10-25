import { useCallback, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import PropTypes from 'prop-types';

export default function HomePage({ featuredLimit = 8 }) {
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { data, loading, error } = useFetch(`https://dummyjson.com/products?limit=${featuredLimit}`);

  // NEW: Add memoized featured products
  const featuredProducts = useMemo(() => {
    if (!data?.products) return [];
    return data.products.map(product => ({
      ...product,
      isFeatured: product.rating >= 4.5
    }));
  }, [data]);

  const handleViewAll = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  const handleQuickAdd = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!featuredProducts.length) return null;

  return (
    <div>
      <section className="bg-primary-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to ShopApp</h1>
          <p className="mb-8">Discover amazing products at great prices</p>
          <Link to="/products" className="btn bg-white text-primary-500 hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleQuickAdd}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleViewAll}
            className="btn btn-primary"
          >
            View All Products
          </button>
        </div>
      </section>
    </div>
  );
}

HomePage.propTypes = {
  featuredLimit: PropTypes.number
};
