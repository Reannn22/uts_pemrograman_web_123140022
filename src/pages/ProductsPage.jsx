import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import useDebounce from '../hooks/useDebounce';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import PropTypes from 'prop-types';

export default function ProductsPage({ initialSortBy = '', itemsPerPage = 20 }) {
  const searchInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { dispatch } = useCart();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data, loading, error } = useFetch('https://dummyjson.com/products');

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
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search products..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="mt-2 p-2 border rounded"
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Found {stats.totalProducts} products | 
        Average Price: ${stats.averagePrice.toFixed(2)} | 
        Average Rating: {stats.averageRating.toFixed(1)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

ProductsPage.propTypes = {
  initialSortBy: PropTypes.string,
  itemsPerPage: PropTypes.number
};
