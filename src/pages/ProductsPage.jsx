import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { fetchProducts, searchProducts } from '../services/dummyApi';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import useDebounce from '../hooks/useDebounce';
import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const searchInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch } = useCart();
  const debouncedSearch = useDebounce(searchTerm);

  const handleAddToCart = useCallback((product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }, [dispatch]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = debouncedSearch
          ? await searchProducts(debouncedSearch)
          : await fetchProducts(20);
        setProducts(data.products);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [debouncedSearch]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto">
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search products..."
          className="input"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {error && <ErrorMessage message={error} />}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
