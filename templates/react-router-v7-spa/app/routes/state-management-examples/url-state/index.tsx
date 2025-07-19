import { href, useSearchParams } from 'react-router';
import { useState } from 'react';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Mock data for demonstration
const MOCK_PRODUCTS = [
  { id: 1, name: 'React Fundamentals', category: 'frontend', price: 99 },
  { id: 2, name: 'Node.js Mastery', category: 'backend', price: 129 },
  { id: 3, name: 'TypeScript Deep Dive', category: 'frontend', price: 89 },
  { id: 4, name: 'Database Design', category: 'backend', price: 149 },
  { id: 5, name: 'DevOps Essentials', category: 'devops', price: 199 },
  { id: 6, name: 'Vue.js Complete', category: 'frontend', price: 109 },
  { id: 7, name: 'Python Automation', category: 'backend', price: 79 },
  { id: 8, name: 'Docker Mastery', category: 'devops', price: 159 },
];

const ITEMS_PER_PAGE = 3;

const URLStateExample = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempSearch, setTempSearch] = useState(searchParams.get('search') || '');

  // Get state from URL
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sortBy = searchParams.get('sortBy') || 'name';
  const showModal = searchParams.get('modal') === 'true';

  // Filter and sort products based on URL state
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || product.category === category;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Helper to update URL params
  const updateParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    // Reset to page 1 when filters change (except when explicitly changing page)
    if (!('page' in updates) && Object.keys(updates).some(key => key !== 'page')) {
      newParams.delete('page');
    }

    setSearchParams(newParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ search: tempSearch });
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">URL State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>Search filters, pagination, and modal state are stored in URL parameters</li>
            <li>State is shareable via URL - try copying and pasting the URL</li>
            <li>Browser back/forward buttons work naturally with state changes</li>
            <li>URL serves as the source of truth for application state</li>
          </ul>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 grid gap-4 lg:grid-cols-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Search products..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>

          <select
            className="rounded border p-2"
            value={category}
            onChange={(e) => updateParams({ category: e.target.value })}
          >
            <option value="all">All Categories</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="devops">DevOps</option>
          </select>

          <select
            className="rounded border p-2"
            value={sortBy}
            onChange={(e) => updateParams({ sortBy: e.target.value })}
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>

          <Button
            onClick={() => updateParams({ modal: showModal ? null : 'true' })}
            variant={showModal ? 'default' : 'outline'}
          >
            {showModal ? 'Close' : 'Show'} Modal
          </Button>
        </div>

        {/* Active Filters Display */}
        {(search || category !== 'all' || sortBy !== 'name') && (
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {search && (
              <span className="rounded bg-blue-100 px-2 py-1 text-sm">
                Search: "{search}"
                <button
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setTempSearch('');
                    updateParams({ search: null });
                  }}
                >
                  ×
                </button>
              </span>
            )}
            {category !== 'all' && (
              <span className="rounded bg-green-100 px-2 py-1 text-sm">
                Category: {category}
                <button
                  className="ml-2 text-green-600 hover:text-green-800"
                  onClick={() => updateParams({ category: 'all' })}
                >
                  ×
                </button>
              </span>
            )}
            {sortBy !== 'name' && (
              <span className="rounded bg-purple-100 px-2 py-1 text-sm">
                Sort: {sortBy}
                <button
                  className="ml-2 text-purple-600 hover:text-purple-800"
                  onClick={() => updateParams({ sortBy: 'name' })}
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.map(product => (
            <div key={product.id} className="rounded-lg border p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{product.category}</p>
              <p className="text-lg font-bold text-green-600">${product.price}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              disabled={page <= 1}
              onClick={() => updateParams({ page: (page - 1).toString() })}
              variant="outline"
            >
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <Button
                key={pageNum}
                onClick={() => updateParams({ page: pageNum.toString() })}
                variant={pageNum === page ? 'default' : 'outline'}
                className="px-3"
              >
                {pageNum}
              </Button>
            ))}

            <Button
              disabled={page >= totalPages}
              onClick={() => updateParams({ page: (page + 1).toString() })}
              variant="outline"
            >
              Next
            </Button>
          </div>
        )}

        {/* Modal Example */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 max-w-md rounded-lg bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold">Modal State in URL</h3>
              <p className="mb-4 text-sm text-gray-600">
                This modal's open/closed state is stored in the URL parameter 'modal=true'. 
                Notice how the URL changes when you open/close the modal.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => updateParams({ modal: null })}
                  variant="outline"
                >
                  Close Modal
                </Button>
                <Button onClick={() => window.location.reload()}>
                  Refresh Page (Modal Persists)
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Current URL Display */}
        <div className="mt-8 rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-semibold">Current URL Parameters:</h3>
          <code className="block break-all text-sm">
            {window.location.search || '(no parameters)'}
          </code>
          <p className="mt-2 text-xs text-gray-600">
            Copy this URL to share the exact same state with someone else!
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default URLStateExample;