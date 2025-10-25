const BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (limit = 20, skip = 0) => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchProductsByCategory = async (category) => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!response.ok) throw new Error('Failed to fetch category products');
  return response.json();
};

export const searchProducts = async (query) => {
  const response = await fetch(`${BASE_URL}/products/search?q=${query}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
};
