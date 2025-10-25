import { useState, useEffect } from 'react';
import { fetchProducts, searchProducts } from '../services/dummyApi';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import useDebounce from '../hooks/useDebounce';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm);

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

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto">
        <input
          type="search"
          placeholder="Search products..."
          className="input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <ErrorMessage message={error} />}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
