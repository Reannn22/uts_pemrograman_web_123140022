import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Existing routes */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/sort/:sortType" element={<ProductsPage />} />
        {/* Existing routes */}
      </Routes>
    </Router>
  );
}
