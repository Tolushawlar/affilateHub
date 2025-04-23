
import { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

interface ProductListProps {
    filters: Record<string, any>
    searchQuery: string
    sortBy: string
    page: number
    onEmpty: () => JSX.Element
}

export function ProductList({ filters, searchQuery, sortBy, page, onEmpty }: ProductListProps) {
    // Mock products data - in real app would fetch from API
    const products: Product[] = [
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
          commission: 10
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
          commission: 15
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
          commission: 20
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
          commission: 25
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
          commission: 12
        },
        {
          id: '6',
          name: 'Bluetooth Speaker',
          description: 'Waterproof portable speaker with 360° sound',
          price: 79.99,
          rating: 4.4,
          image: 'https://images.unsplash.com/photo-1598550890849-8b3edb6aab84',
          category: 'Audio',
          plan: 'Standard',
          affiliateLink: 'https://affiliate.com/bluetooth-speaker',
          commission: 15
        },
        // {
        //   id: '7',
        //   name: 'Gaming Mouse',
        //   description: 'RGB gaming mouse with programmable buttons',
        //   price: 59.99,
        //   rating: 4.3,
        //   image: 'https://images.unsplash.com/photo-1615471164885-c06fe70c4875',
        //   category: 'Gaming',
        //   plan: 'Standard',
        //   affiliateLink: 'https://affiliate.com/gaming-mouse',
        //   commission: 10
        // },
        // {
        //   id: '8',
        //   name: 'Mechanical Keyboard',
        //   description: 'RGB mechanical gaming keyboard with Cherry MX switches',
        //   price: 129.99,
        //   rating: 4.6,
        //   image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a',
        //   category: 'Gaming',
        //   plan: 'Premium',
        //   affiliateLink: 'https://affiliate.com/mechanical-keyboard',
        //   commission: 18
        // },
        // {
        //   id: '9',
        //   name: 'Laptop Stand',
        //   description: 'Adjustable ergonomic laptop stand with cooling',
        //   price: 39.99,
        //   rating: 4.2,
        //   image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52b1',
        //   category: 'Accessories',
        //   plan: 'Basic',
        //   affiliateLink: 'https://affiliate.com/laptop-stand',
        //   commission: 8
        // },
        // {
        //   id: '10',
        //   name: 'USB-C Hub',
        //   description: '7-in-1 USB-C hub with HDMI and card readers',
        //   price: 45.99,
        //   rating: 4.4,
        //   image: 'https://images.unsplash.com/photo-1573496799515-eebbb63814d0',
        //   category: 'Accessories',
        //   plan: 'Basic',
        //   affiliateLink: 'https://affiliate.com/usb-hub',
        //   commission: 10
        // }
      ];
      

    // Apply filters, search and sorting
    let filteredProducts = products

    // Apply search filter
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }

    // Apply sorting
    filteredProducts.sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating
        }
        // Add other sort implementations as needed
        return 0
    })

    if (filteredProducts.length === 0) {
        return onEmpty()
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}