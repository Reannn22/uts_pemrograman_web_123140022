import { useCallback, useMemo, useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../utils/translations';
import arrowRight from '../assets/icon/arrow-right.svg';
import Loading from '../components/common/Loading';

export default function HomePage({ featuredLimit = 8 }) {
  const { isDark } = useTheme();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get('lang') || localStorage.getItem('lang') || 'id';
  
  // Get both home and product translations
  const homeTexts = translations[lang]?.home || {};
  const productTexts = translations[lang]?.products || {};

  // Get values with defaults
  const welcome = homeTexts.welcome || 'Welcome to';
  const discover = homeTexts.discover || 'Discover quality products at the best prices';
  const shopNow = homeTexts.shopNow || 'Shop Now';
  const featuredTitle = productTexts.featured || 'Featured Products';
  const viewAllText = productTexts.viewAll || 'View All Products';

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const { data } = useFetch(`https://dummyjson.com/products?limit=${featuredLimit}`);

  const bgImages = [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1920',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920',
    'https://images.unsplash.com/photo-1462392246754-28dfa2df8e6b?q=80&w=1920'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [bgImages.length]);

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

  if (!data) {
    return (
      <div className={`w-full min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        {/* Hero Section Skeleton */}
        <div className="relative w-full min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse">
          <div className="text-center space-y-6">
            <div className="h-12 w-96 bg-gray-700 rounded"></div>
            <div className="h-6 w-80 bg-gray-700 rounded mx-auto"></div>
            <div className="h-12 w-48 bg-gray-700 rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Products Section Skeleton */}
        <div className="w-full py-12 px-4 md:px-8">
          <div className="h-8 w-64 bg-gray-700 rounded mx-auto mb-8"></div>
          <div className="max-w-[2000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className={`rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
              >
                <div className="h-48 bg-gray-700 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loading size="lg" />
        </div>
      </div>
    );
  }

  if (!featuredProducts.length) return null;

  return (
    <div className={`w-full min-h-screen overflow-hidden ${
      isDark ? 'bg-gray-900' : 'bg-white'
    }`}>
      <section 
        className="relative w-full min-h-[90vh] flex items-center justify-center transition-all duration-1000 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bgImages[currentBgIndex]})`,
          transition: 'background-image 1s ease-in-out'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative w-full px-4 text-center z-10">
          <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
            {welcome} <span className="text-white">ShoPPie</span>
          </h1>
          <p className="text-xl mb-8 text-white font-medium">
            {discover}
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full
              transition-all duration-300 transform hover:scale-105
              bg-white/20 text-white hover:bg-white/30
              shadow-lg hover:shadow-xl"
          >
            {shopNow}
            <img 
              src={arrowRight} 
              alt="arrow" 
              className="w-5 h-5 ml-2 invert"
            />
          </Link>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className={`w-full py-12 px-4 md:px-8 ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}>
          <h2 className={`text-2xl font-bold mb-8 text-center ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {featuredTitle}
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleQuickAdd}
                lang={lang}
                isDark={isDark}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={handleViewAll}
              className={`btn ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'btn-primary'}`}
            >
              {viewAllText}
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

HomePage.propTypes = {
  featuredLimit: PropTypes.number
};
