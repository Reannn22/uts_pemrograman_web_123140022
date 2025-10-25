import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import Loading from '../components/common/Loading';
import { fetchProducts } from '../services/dummyApi';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(8);
        setFeaturedProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <Loading />;

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
