import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { fetchProducts } from '../services/dummyApi';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import PropTypes from 'prop-types';
import { translations } from '../utils/translations'; // Adjust the import based on your project structure

export default function ProductsPage({ initialSortBy = '', itemsPerPage = 20 }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lang = searchParams.get('lang') || localStorage.getItem('lang') || 'id';
  const { isDark } = useTheme();
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { dispatch } = useCart();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products?limit=${itemsPerPage}`
  );
  const pageTexts = translations[lang]?.productPage || {};

  // Focus search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Memoize filtered products
  const { filteredProducts, stats } = useMemo(() => {
    if (!data?.products) {
      return {
        filteredProducts: [],
        stats: { totalProducts: 0, averagePrice: 0, averageRating: 0 },
      };
    }

    let filtered = data.products;

    // Apply search filter
    if (debouncedSearch) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Apply sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    // Calculate stats
    const stats = {
      totalProducts: filtered.length,
      averagePrice: filtered.reduce((sum, p) => sum + p.price, 0) / filtered.length || 0,
      averageRating: filtered.reduce((sum, p) => sum + p.rating, 0) / filtered.length || 0,
    };

    return { filteredProducts: filtered, stats };
  }, [data, debouncedSearch, sortBy]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleAddToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={`min-h-screen w-full py-8 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <input
            ref={searchInputRef}
            type="search"
            placeholder={pageTexts.searchPlaceholder}
            className={`w-full p-3 rounded-lg border ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
            }`}
            value={searchTerm}
            onChange={handleSearch}
          />
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={`w-full p-3 rounded-lg border ${
              isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
            }`}
          >
            <option value="">{pageTexts.sortBy}</option>
            <option value="price-low">{pageTexts.priceLowHigh}</option>
            <option value="price-high">{pageTexts.priceHighLow}</option>
            <option value="rating">{pageTexts.rating}</option>
          </select>
        </div>

        <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {pageTexts.foundProducts} {stats.totalProducts} products | 
            {pageTexts.averagePrice}: ${stats.averagePrice.toFixed(2)} | 
            {pageTexts.averageRating}: {stats.averageRating.toFixed(1)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isDark={isDark}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

ProductsPage.propTypes = {
  initialSortBy: PropTypes.string,
  itemsPerPage: PropTypes.number
};
