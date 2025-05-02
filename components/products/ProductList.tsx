import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  filters: {
    category?: string[];
    featured?: string[];
    lastest?: string[];
    [key: string]: any; // Allow other filter keys
  };
  searchQuery: string;
  sortBy: string;
  page: number;
  products: Product[]; // Explicitly define the 'products' prop
  onEmpty: () => JSX.Element;
}

export function ProductList({
  filters,
  searchQuery,
  sortBy,
  page,
  products, // Receive the 'products' prop
  onEmpty,
}: ProductListProps) {
  // Apply filters, search and sorting on the received products
  let filteredProducts = [...products]; // Create a copy to avoid modifying the original prop

  // Apply search filter
  if (searchQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply category filter
  if (filters.category && filters.category.length > 0) {
    filteredProducts = filteredProducts.filter((product) =>
      filters.category?.includes(product.category)
    );
  }

  // Apply featured filter
  if (filters.featured && filters.featured.includes('featured')) {
    filteredProducts = filteredProducts.filter((product) => product.isFeatured);
  }

  // Apply latest filter
  if (filters.lastest && filters.lastest.includes('lastest')) {
    filteredProducts = filteredProducts.filter((product) => product.isLatest);
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Add other sort implementations as needed
    return 0;
  });

  if (filteredProducts.length === 0) {
    return onEmpty();
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}