import { useState } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Shopping cart item interface
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Product catalog component
const ProductCatalog = ({ 
  onAddToCart 
}: { 
  onAddToCart: (product: Omit<CartItem, 'quantity'>) => void 
}) => {
  const products = [
    { id: 1, name: 'React Fundamentals Course', price: 99 },
    { id: 2, name: 'Advanced TypeScript', price: 129 },
    { id: 3, name: 'Node.js Mastery', price: 149 },
    { id: 4, name: 'Full Stack Bundle', price: 299 },
  ];

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Product Catalog</h3>
      <div className="space-y-3">
        {products.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
            <Button onClick={() => onAddToCart(product)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Shopping cart component
const ShoppingCart = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onClearCart 
}: {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Shopping Cart</h3>
        {items.length > 0 && (
          <Button onClick={onClearCart} variant="outline" className="text-sm h-8 px-3">
            Clear Cart
          </Button>
        )}
      </div>
      
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">${item.price} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="text-sm h-8 px-3"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    className="text-sm h-8 px-3"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="text-sm h-8 px-3"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total: ${total.toFixed(2)}</span>
              <Button>Checkout</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Order summary component (sibling to cart)
const OrderSummary = ({ items }: { items: CartItem[] }) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const averagePrice = itemCount > 0 ? total / itemCount : 0;

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Items in cart:</span>
          <span className="font-medium">{itemCount}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Average price per item:</span>
          <span className="font-medium">${averagePrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span>Shipping:</span>
          <span className="font-medium">{total > 200 ? 'FREE' : '$9.99'}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total:</span>
          <span>${(total + (total > 200 ? 0 : 9.99)).toFixed(2)}</span>
        </div>
      </div>
      
      {total > 200 && (
        <div className="mt-3 p-2 bg-green-50 text-green-700 text-sm rounded">
          🎉 You qualify for free shipping!
        </div>
      )}
    </div>
  );
};

// Chat application example
interface Message {
  id: number;
  user: string;
  text: string;
  timestamp: Date;
}

const ChatInput = ({ 
  onSendMessage, 
  currentUser 
}: { 
  onSendMessage: (text: string) => void;
  currentUser: string;
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <h4 className="mb-2 font-medium">Send Message (as {currentUser})</h4>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

const MessageList = ({ 
  messages, 
  currentUser 
}: { 
  messages: Message[];
  currentUser: string;
}) => {
  return (
    <div className="rounded-lg border p-4">
      <h4 className="mb-4 font-medium">Chat Messages</h4>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No messages yet</p>
        ) : (
          messages.map(message => (
            <div
              key={message.id}
              className={`p-2 rounded max-w-xs ${
                message.user === currentUser
                  ? 'bg-blue-500 text-white ml-auto'
                  : 'bg-gray-100'
              }`}
            >
              <div className="text-xs opacity-75 mb-1">
                {message.user} • {message.timestamp.toLocaleTimeString()}
              </div>
              <div>{message.text}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const UserSelector = ({ 
  currentUser, 
  onUserChange 
}: { 
  currentUser: string;
  onUserChange: (user: string) => void;
}) => {
  const users = ['Alice', 'Bob', 'Charlie'];

  return (
    <div className="rounded-lg border p-4">
      <h4 className="mb-2 font-medium">Switch User</h4>
      <div className="flex gap-2">
        {users.map(user => (
          <Button
            key={user}
            variant={user === currentUser ? 'default' : 'outline'}
            onClick={() => onUserChange(user)}
          >
            {user}
          </Button>
        ))}
      </div>
      <p className="text-xs text-gray-600 mt-2">
        Current user: <strong>{currentUser}</strong>
      </p>
    </div>
  );
};

const LiftedStateExample = () => {
  // Shopping cart state - lifted up to be shared between catalog and cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Chat state - lifted up to be shared between input and messages
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState('Alice');

  // Cart operations
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Chat operations
  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      user: currentUser,
      text,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Lifted State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>State is lifted to the closest common ancestor component</li>
            <li>Sibling components can share state through their parent</li>
            <li>Parent passes state and update functions as props</li>
            <li>Use when multiple components need to coordinate state</li>
          </ul>
        </div>

        {/* Shopping Cart Example */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Shopping Cart Example</h2>
          <p className="mb-4 text-gray-600">
            The cart state is lifted to the parent component and shared between the catalog, 
            cart, and order summary components.
          </p>
          
          <div className="grid gap-6 lg:grid-cols-3">
            <ProductCatalog onAddToCart={addToCart} />
            <ShoppingCart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
              onClearCart={clearCart}
            />
            <OrderSummary items={cartItems} />
          </div>
        </div>

        {/* Chat Application Example */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Chat Application Example</h2>
          <p className="mb-4 text-gray-600">
            The messages and current user state are lifted up and shared between the input, 
            message list, and user selector components.
          </p>
          
          <div className="grid gap-6 lg:grid-cols-3">
            <UserSelector currentUser={currentUser} onUserChange={setCurrentUser} />
            <MessageList messages={messages} currentUser={currentUser} />
            <ChatInput onSendMessage={sendMessage} currentUser={currentUser} />
          </div>
        </div>

        {/* State Visualization */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-4 text-lg font-semibold">Current State</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Shopping Cart State:</h4>
              <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                {JSON.stringify(cartItems, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">Chat State:</h4>
              <pre className="text-xs bg-white p-2 rounded border overflow-auto">
                {JSON.stringify({ currentUser, messageCount: messages.length }, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">When to Lift State:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Lift state when:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Multiple components need the same data</li>
                <li>Components need to coordinate behavior</li>
                <li>One component needs to update another's state</li>
                <li>State changes affect multiple UI areas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Don't lift when:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Only one component uses the state</li>
                <li>State is purely for UI (like form inputs)</li>
                <li>Components are not related</li>
                <li>It would create prop drilling issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LiftedStateExample;