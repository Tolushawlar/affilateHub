/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import Link from 'next/link';
import { ProductList } from '../components/products/ProductList';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductSearch } from '../components/products/ProductSearch';
import { ProductSort } from '../components/products/ProductSort';
import { Pagination } from '../components/common/Pagination';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { EmptyState } from '../components/common/EmptyState';
import { useState, useEffect } from 'react';
import { Product } from '../types/product';

export default function Home() {
  const [filters, setFilters] = useState<{
    category?: string[];
    featured?: string[];
    lastest?: string[];
  }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categoriesData = [
    { id: 'electronics', name: 'Electronics', value: 'ecommerceRetail' },
    { id: 'fashion', name: 'Fashion', value: 'ecommerceRetail' },
    { id: 'home', name: 'Home & Living', value: 'realEstate' },
    { id: 'beauty', name: 'Beauty', value: 'HealthWellness' },
    { id: 'sports', name: 'Sports', value: 'TravelLifestyle' },
    { id: 'books', name: 'Books', value: 'EducationOnline' }
  ];

  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description for product 1',
      price: 99.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1581291519195-ef11498d1cf5',
      category: 'ecommerceRetail',
      plan: 'Standard',
      affiliateLink: 'https://affiliate.com/product1',
      commission: 10,
      isFeatured: true,
      isLatest: false,
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description for product 2',
      price: 149.99,
      rating: 4.0,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
      category: 'HealthWellness',
      plan: 'Premium',
      affiliateLink: 'https://affiliate.com/product2',
      commission: 15,
      isFeatured: false,
      isLatest: true,
    },
    {
      id: '3',
      name: 'Wireless Earbuds Pro',
      description: 'Premium noise-cancelling wireless earbuds with 24hr battery life',
      price: 199.99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1616594039964-b56272b2a80d',
      category: 'ecommerceRetail',
      plan: 'Premium',
      affiliateLink: 'https://affiliate.com/earbuds-pro',
      commission: 20,
      isFeatured: true,
      isLatest: true,
    },
    {
      id: '4',
      name: 'Smart Fitness Watch',
      description: 'Track your health and fitness with this advanced smartwatch',
      price: 249.99,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1603791440384-56cd371ee9a7',
      category: 'EducationOnline',
      plan: 'Premium',
      affiliateLink: 'https://affiliate.com/fitness-watch',
      commission: 25,
      isFeatured: false,
      isLatest: false,
    },
    {
      id: '5',
      name: 'Portable Power Bank',
      description: '20000mAh high-capacity portable charger with fast charging',
      price: 49.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1603791440384-0d67db469f6a',
      category: 'BussinessFinance',
      plan: 'Standard',
      affiliateLink: 'https://affiliate.com/powerbank',
      commission: 12,
      isFeatured: false,
      isLatest: true,
    },
    {
      id: '6',
      name: 'Bluetooth Speaker',
      description: 'Waterproof portable speaker with 360° sound',
      price: 79.99,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1598550890849-8b3edb6aab84',
      category: 'ecommerceRetail',
      plan: 'Standard',
      affiliateLink: 'https://affiliate.com/bluetooth-speaker',
      commission: 15,
      isFeatured: false,
      isLatest: false,
    },
    {
      id: '7',
      name: 'Fashion Item 1',
      description: 'Description for fashion item 1',
      price: 39.99,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1546184733-19134349b51b',
      category: 'ecommerceRetail',
      plan: 'Basic',
      affiliateLink: 'https://affiliate.com/fashion1',
      commission: 8,
      isFeatured: false,
      isLatest: true,
    },
    {
      id: '8',
      name: 'Home Decor 1',
      description: 'Description for home decor 1',
      price: 129.99,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f8',
      category: 'realEstate',
      plan: 'Premium',
      affiliateLink: 'https://affiliate.com/homedecor1',
      commission: 18,
      isFeatured: true,
      isLatest: false,
    },
    {
      id: '9',
      name: 'Beauty Product 1',
      description: 'Description for beauty product 1',
      price: 29.99,
      rating: 4.1,
      image: 'https://images.unsplash.com/photo-1596492785630-9b1b7b17d134',
      category: 'HealthWellness',
      plan: 'Basic',
      affiliateLink: 'https://affiliate.com/beauty1',
      commission: 10,
      isFeatured: false,
      isLatest: false,
    },
    {
      id: '10',
      name: 'Sports Gear 1',
      description: 'Description for sports gear 1',
      price: 79.99,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1523275335684-3c171b52f216',
      category: 'TravelLifestyle',
      plan: 'Standard',
      affiliateLink: 'https://affiliate.com/sports1',
      commission: 12,
      isFeatured: true,
      isLatest: true,
    },
    {
      id: '11',
      name: 'Book Title 1',
      description: 'Description for book 1',
      price: 19.99,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1595869943914-e859c6070884',
      category: 'EducationOnline',
      plan: 'Basic',
      affiliateLink: 'https://affiliate.com/book1',
      commission: 15,
      isFeatured: false,
      isLatest: true,
    }
  ];

  const latestAffiliates = allProducts.filter(product => product.isLatest);
  const featuredAffiliates = allProducts.filter(product => product.isFeatured);

  const filteredCategoryItems = allProducts.filter(item => {
    if (selectedCategory) {
      return categoriesData.find(cat => cat.id === selectedCategory)?.value === item.category;
    }
    return true;
  });

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFilters({}); // Clear other filters when a category is selected
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-8">
              Discover Top Affiliate Products & Maximize Your Earnings
            </h1>
            <p className="text-white text-lg mb-8 pr-10">
              Browse through thousands of high-converting affiliate products across multiple categories.
              Join our platform to start earning passive income today.
            </p>
            <div className="max-w-xl">
              <ProductSearch
                value={searchQuery}
                onChange={setSearchQuery}
                // placeholder={searchQuery}
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://picsum.photos/500/300"
              alt="Affiliate Platform Hero"
              className="rounded-lg shadow-xl"
              width={600}
              height={500}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilters filters={filters} onChange={setFilters} />

        {/* Latest Affiliates Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          <main className="w-full">
            <h1 className="text-xl font-semibold mb-4">Latest Affiliates</h1>
            <div className="bg-white rounded-xl p-6">
              {isLoading ? (
                <LoadingSpinner />
              ) : latestAffiliates.length > 0 ? (
                <ProductList
                  filters={{ ...filters, lastest: filters.lastest }}
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  page={currentPage}
                  products={latestAffiliates}
                  onEmpty={() => (
                    <EmptyState
                      title="No latest affiliates found"
                      description="Check back for updates!"
                    />
                  )}
                />
              ) : (
                <EmptyState
                  title="No latest affiliates found"
                  description="Check back for updates!"
                />
              )}
            </div>
          </main>
        </div>

        {/* Featured Affiliates Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          <main className="w-full">
            <h1 className="text-xl font-semibold mb-4">Featured Affiliates</h1>
            <div className="bg-white rounded-xl p-6">
              {isLoading ? (
                <LoadingSpinner />
              ) : featuredAffiliates.length > 0 ? (
                <ProductList
                  filters={{ ...filters, featured: filters.featured }}
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  page={currentPage}
                  products={featuredAffiliates}
                  onEmpty={() => (
                    <EmptyState
                      title="No featured affiliates found"
                      description="Check back for popular picks!"
                    />
                  )}
                />
              ) : (
                <EmptyState
                  title="No featured affiliates found"
                  description="Check back for popular picks!"
                />
              )}
            </div>
          </main>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          {/* Categories Column */}
          <aside className="w-64 bg-white rounded-xl p-6">
            <div className='flex flex-row items-center justify-between align-center mb-5'>
              <h2 className="text-lg font-semibold ">Categories</h2>
              <Link
                href={`/categories`}
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="flex flex-col space-y-2">
              {categoriesData.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`text-left px-4 py-2 rounded-lg transition ${selectedCategory === category.id
                    ? 'bg-teal-100 text-teal-800'
                    : 'hover:bg-gray-100'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Category Items Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCategoryItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link
                    href={`/products/${item.id}`}
                    className="text-teal-600 hover:text-teal-800 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              ))}
              {filteredCategoryItems.length === 0 && selectedCategory !== '' && (
                <div className="col-span-full">
                  <EmptyState title="No products in this category" description={`Check back for items in ${categoriesData.find(c => c.id === selectedCategory)?.name}`} />
                </div>
              )}
            </div>
            {selectedCategory === '' && filteredCategoryItems.length > 6 && (
              <div className="mt-6 flex justify-end">
                <Link href="/categories" className="text-teal-600 hover:text-teal-800 font-medium">
                  View All Categories →
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}