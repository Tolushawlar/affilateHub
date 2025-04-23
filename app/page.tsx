"use client"
import Link from 'next/link'
import { ProductList } from '../components/products/ProductList'
import { ProductFilters } from '../components/products/ProductFilters'
import { ProductSearch } from '../components/products/ProductSearch'
import { ProductSort } from '../components/products/ProductSort'
import { Pagination } from '../components/common/Pagination'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { EmptyState } from '../components/common/EmptyState'
import { useState } from 'react'

export default function Home() {
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popularity')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('electronics')

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' },
    { id: 'books', name: 'Books' }
  ]

  const categoryItems = [
    { id: 1, name: 'Product 1', description: 'Description for product 1', category: 'electronics' },
    { id: 2, name: 'Product 2', description: 'Description for product 2', category: 'electronics' },
    { id: 3, name: 'Product 3', description: 'Description for product 3', category: 'electronics' },
    { id: 4, name: 'Product 4', description: 'Description for product 4', category: 'electronics' },
    { id: 5, name: 'Product 5', description: 'Description for product 5', category: 'electronics' },
    { id: 6, name: 'Product 6', description: 'Description for product 6', category: 'electronics' },
    { id: 7, name: 'Fashion Item 1', description: 'Description for fashion item 1', category: 'fashion' },
    { id: 8, name: 'Home Decor 1', description: 'Description for home decor 1', category: 'home' },
    { id: 9, name: 'Beauty Product 1', description: 'Description for beauty product 1', category: 'beauty' },
    { id: 10, name: 'Sports Gear 1', description: 'Description for sports gear 1', category: 'sports' },
    { id: 11, name: 'Book Title 1', description: 'Description for book 1', category: 'books' }
  ]

  const filteredItems = categoryItems.filter(item => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Previous sections remain unchanged */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilters filters={filters} onChange={setFilters} />

        {/* Latest Affiliates Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          <main className="w-full">
            <h1 className="text-xl font-semibold mb-4">Latest Affiliates</h1>
            <div className="bg-white rounded-xl p-6">
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <ProductList
                  filters={filters}
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  page={currentPage}
                  onEmpty={() => (
                    <EmptyState
                      title="No products found"
                      description="Try adjusting your filters or search query"
                    />
                  )}
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
              ) : (
                <ProductList
                  filters={filters}
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  page={currentPage}
                  onEmpty={() => (
                    <EmptyState
                      title="No products found"
                      description="Try adjusting your filters or search query"
                    />
                  )}
                />
              )}
            </div>
          </main>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          {/* Categories Column */}
          <aside className="w-64 bg-white rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="flex flex-col space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
              {filteredItems.map(item => (
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
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
