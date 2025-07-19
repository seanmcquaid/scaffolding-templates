import { useState, useMemo } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Mock product data
const PRODUCTS = [
  { id: 1, name: 'React Fundamentals', category: 'frontend', price: 99, rating: 4.8, sales: 1200 },
  { id: 2, name: 'Node.js Mastery', category: 'backend', price: 129, rating: 4.7, sales: 800 },
  { id: 3, name: 'TypeScript Deep Dive', category: 'frontend', price: 89, rating: 4.9, sales: 1500 },
  { id: 4, name: 'Database Design', category: 'backend', price: 149, rating: 4.6, sales: 600 },
  { id: 5, name: 'DevOps Essentials', category: 'devops', price: 199, rating: 4.5, sales: 400 },
  { id: 6, name: 'Vue.js Complete', category: 'frontend', price: 109, rating: 4.7, sales: 700 },
  { id: 7, name: 'Python Automation', category: 'backend', price: 79, rating: 4.8, sales: 900 },
  { id: 8, name: 'Docker Mastery', category: 'devops', price: 159, rating: 4.6, sales: 500 },
];

// Shopping cart component with derived statistics
const ShoppingCart = () => {
  const [items, setItems] = useState<Array<{ id: number; quantity: number }>>([
    { id: 1, quantity: 2 },
    { id: 3, quantity: 1 },
    { id: 5, quantity: 1 },
  ]);

  // Derived state: cart items with product details
  const cartWithDetails = useMemo(() => {
    return items.map(item => ({
      ...item,
      product: PRODUCTS.find(p => p.id === item.id)!,
    }));
  }, [items]);

  // Derived state: cart statistics
  const cartStats = useMemo(() => {
    const subtotal = cartWithDetails.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );
    const totalItems = cartWithDetails.reduce((sum, item) => sum + item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + tax + shipping;
    const averageItemPrice = totalItems > 0 ? subtotal / totalItems : 0;

    return {
      subtotal,
      totalItems,
      tax,
      shipping,
      total,
      averageItemPrice,
      freeShipping: subtotal > 100,
    };
  }, [cartWithDetails]);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
    } else {
      setItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const addItem = (productId: number) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const availableProducts = PRODUCTS.filter(
    product => !items.some(item => item.id === product.id)
  );

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Shopping Cart with Derived Statistics</h3>
      
      {/* Add products section */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Add Products:</h4>
        <div className="flex flex-wrap gap-2">
          {availableProducts.map(product => (
            <Button
              key={product.id}
              variant="outline"
              className="text-sm"
              onClick={() => addItem(product.id)}
            >
              Add {product.name} (${product.price})
            </Button>
          ))}
        </div>
      </div>

      {/* Cart items */}
      <div className="space-y-3 mb-4">
        {cartWithDetails.map(item => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
            <div className="flex-1">
              <h4 className="font-medium">{item.product.name}</h4>
              <p className="text-sm text-gray-600">${item.product.price} each</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="text-sm h-8 px-3"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                className="text-sm h-8 px-3"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <div className="text-right">
              <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Derived statistics display */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Items ({cartStats.totalItems}):</span>
          <span>${cartStats.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (10%):</span>
          <span>${cartStats.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping:</span>
          <span>{cartStats.freeShipping ? 'FREE' : `$${cartStats.shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Average per item:</span>
          <span>${cartStats.averageItemPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>${cartStats.total.toFixed(2)}</span>
        </div>
        {cartStats.freeShipping && (
          <div className="text-green-600 text-sm">🎉 Free shipping qualified!</div>
        )}
      </div>
    </div>
  );
};

// Product analytics component with derived insights
const ProductAnalytics = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Derived state: filtered products
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Derived state: analytics data
  const analytics = useMemo(() => {
    const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.price * p.sales), 0);
    const averagePrice = filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length;
    const averageRating = filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length;
    const totalSales = filteredProducts.reduce((sum, p) => sum + p.sales, 0);
    
    const bestSeller = filteredProducts.reduce((best, product) => 
      product.sales > best.sales ? product : best
    );
    
    const highestRated = filteredProducts.reduce((best, product) => 
      product.rating > best.rating ? product : best
    );

    const priceRanges = {
      budget: filteredProducts.filter(p => p.price < 100),
      medium: filteredProducts.filter(p => p.price >= 100 && p.price < 150),
      premium: filteredProducts.filter(p => p.price >= 150),
    };

    return {
      totalRevenue,
      averagePrice,
      averageRating,
      totalSales,
      bestSeller,
      highestRated,
      priceRanges,
    };
  }, [filteredProducts]);

  const categories = ['all', 'frontend', 'backend', 'devops'];

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Product Analytics with Derived Insights</h3>
      
      {/* Category filter */}
      <div className="mb-4">
        <h4 className="mb-2 font-medium">Filter by Category:</h4>
        <div className="flex gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Analytics grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-2xl font-bold text-blue-600">
            ${analytics.totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-blue-800">Total Revenue</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded">
          <div className="text-2xl font-bold text-green-600">
            {analytics.totalSales.toLocaleString()}
          </div>
          <div className="text-sm text-green-800">Total Sales</div>
        </div>
        
        <div className="bg-purple-50 p-3 rounded">
          <div className="text-2xl font-bold text-purple-600">
            ${analytics.averagePrice.toFixed(0)}
          </div>
          <div className="text-sm text-purple-800">Average Price</div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded">
          <div className="text-2xl font-bold text-yellow-600">
            {analytics.averageRating.toFixed(1)}★
          </div>
          <div className="text-sm text-yellow-800">Average Rating</div>
        </div>
      </div>

      {/* Top performers */}
      <div className="grid gap-4 md:grid-cols-2 mb-4">
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium mb-2">Best Seller</h4>
          <div className="text-sm">
            <div className="font-medium">{analytics.bestSeller.name}</div>
            <div className="text-gray-600">{analytics.bestSeller.sales} sales</div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium mb-2">Highest Rated</h4>
          <div className="text-sm">
            <div className="font-medium">{analytics.highestRated.name}</div>
            <div className="text-gray-600">{analytics.highestRated.rating}★ rating</div>
          </div>
        </div>
      </div>

      {/* Price distribution */}
      <div className="bg-gray-50 p-3 rounded">
        <h4 className="font-medium mb-2">Price Distribution</h4>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span>Budget (&lt; $100):</span>
            <span>{analytics.priceRanges.budget.length} products</span>
          </div>
          <div className="flex justify-between">
            <span>Medium ($100-$149):</span>
            <span>{analytics.priceRanges.medium.length} products</span>
          </div>
          <div className="flex justify-between">
            <span>Premium ($150+):</span>
            <span>{analytics.priceRanges.premium.length} products</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search component with derived search results
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Derived state: search results
  const searchResults = useMemo(() => {
    let results = PRODUCTS;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    const minPriceNum = parseFloat(minPrice) || 0;
    const maxPriceNum = parseFloat(maxPrice) || Infinity;
    results = results.filter(product => 
      product.price >= minPriceNum && product.price <= maxPriceNum
    );

    return results;
  }, [searchTerm, minPrice, maxPrice]);

  // Derived state: search statistics
  const searchStats = useMemo(() => {
    const totalResults = searchResults.length;
    const avgPrice = searchResults.length > 0 
      ? searchResults.reduce((sum, p) => sum + p.price, 0) / searchResults.length 
      : 0;
    const avgRating = searchResults.length > 0
      ? searchResults.reduce((sum, p) => sum + p.rating, 0) / searchResults.length
      : 0;

    return { totalResults, avgPrice, avgRating };
  }, [searchResults]);

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Product Search with Derived Results</h3>
      
      {/* Search filters */}
      <div className="grid gap-4 md:grid-cols-3 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Search:</label>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Price:</label>
          <Input
            type="number"
            placeholder="$0"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Max Price:</label>
          <Input
            type="number"
            placeholder="No limit"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Search statistics */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div>
            <span className="font-medium">Results:</span> {searchStats.totalResults}
          </div>
          <div>
            <span className="font-medium">Avg Price:</span> ${searchStats.avgPrice.toFixed(2)}
          </div>
          <div>
            <span className="font-medium">Avg Rating:</span> {searchStats.avgRating.toFixed(1)}★
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2">
        {searchResults.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No products found</p>
        ) : (
          searchResults.map(product => (
            <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600 capitalize">{product.category}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">${product.price}</div>
                <div className="text-sm text-gray-600">{product.rating}★</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DerivedStateExample = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Derived State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>Derived state is computed from existing state or props</li>
            <li>Use <code>useMemo</code> to optimize expensive calculations</li>
            <li>Recalculates automatically when dependencies change</li>
            <li>Avoid storing computed values in state - derive them instead</li>
          </ul>
        </div>

        <div className="space-y-8">
          <ShoppingCart />
          <ProductAnalytics />
          <SearchComponent />
        </div>

        <div className="mt-8 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">Best Practices for Derived State:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Do derive when:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Computing totals, averages, or aggregations</li>
                <li>Filtering or transforming data</li>
                <li>Combining multiple state values</li>
                <li>Expensive calculations that don't need to run every render</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Don't derive when:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>The computation is trivial (no performance benefit)</li>
                <li>You need to persist the computed value</li>
                <li>The value changes independently of its inputs</li>
                <li>Side effects are needed (use useEffect instead)</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            <p className="text-sm">
              <strong>💡 Pro tip:</strong> Use <code>useMemo</code> for expensive computations and 
              regular variables for simple derivations. React's rendering is already quite fast 
              for most simple calculations.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default DerivedStateExample;