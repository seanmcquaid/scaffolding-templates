import { useState, useReducer } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Simple counter component demonstrating useState
const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Counter (useState)</h3>
      <div className="space-y-4">
        <div className="text-center">
          <span className="text-3xl font-bold">{count}</span>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={() => setCount(c => c - step)} variant="outline">
            -{step}
          </Button>
          <Button onClick={() => setCount(0)} variant="outline">
            Reset
          </Button>
          <Button onClick={() => setCount(c => c + step)}>
            +{step}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Step:</label>
          <Input
            type="number"
            min="1"
            value={step}
            onChange={(e) => setStep(parseInt(e.target.value) || 1)}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

// Toggle component demonstrating boolean state
const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Toggle Switch (useState)</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div
            className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
              isOn ? 'bg-green-500' : 'bg-gray-300'
            } ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => !isLocked && setIsOn(!isOn)}
          >
            <div
              className={`h-6 w-6 transform rounded-full bg-white transition-transform ${
                isOn ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm">Status: <strong>{isOn ? 'ON' : 'OFF'}</strong></p>
          <p className="text-xs text-gray-600">
            {isLocked ? 'Locked' : 'Click to toggle'}
          </p>
        </div>
        <Button 
          onClick={() => setIsLocked(!isLocked)} 
          variant="outline"
          className="w-full"
        >
          {isLocked ? 'Unlock' : 'Lock'} Switch
        </Button>
      </div>
    </div>
  );
};

// Form component demonstrating multiple useState values
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-semibold">Contact Form (useState)</h3>
        <div className="text-center py-8">
          <div className="text-green-600 text-4xl mb-2">✓</div>
          <p className="text-green-600 font-semibold">Form submitted successfully!</p>
          <p className="text-sm text-gray-600">Resetting form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Contact Form (useState)</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange('name')}
          required
        />
        <Input
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange('email')}
          required
        />
        <textarea
          className="w-full rounded border p-2 min-h-[100px]"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange('message')}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      <div className="mt-4 rounded bg-gray-50 p-3">
        <h4 className="text-sm font-semibold mb-2">Form State:</h4>
        <pre className="text-xs">
          {JSON.stringify({ ...formData, isSubmitting }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Todo list component demonstrating useReducer for complex state
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  newTodo: string;
}

type TodoAction =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'SET_FILTER'; filter: TodoState['filter'] }
  | { type: 'SET_NEW_TODO'; text: string }
  | { type: 'CLEAR_COMPLETED' };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.text,
            completed: false,
          },
        ],
        newTodo: '',
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter,
      };
    case 'SET_NEW_TODO':
      return {
        ...state,
        newTodo: action.text,
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed),
      };
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Learn React state management', completed: true },
      { id: 2, text: 'Build a todo app', completed: false },
      { id: 3, text: 'Master useReducer', completed: false },
    ],
    filter: 'all',
    newTodo: '',
  });

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', text: state.newTodo.trim() });
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Todo List (useReducer)</h3>
      
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input
          placeholder="Add a new todo..."
          value={state.newTodo}
          onChange={(e) => dispatch({ type: 'SET_NEW_TODO', text: e.target.value })}
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="mb-4 flex gap-2">
        {(['all', 'active', 'completed'] as const).map(filter => (
          <Button
            key={filter}
            variant={state.filter === filter ? 'default' : 'outline'}
            onClick={() => dispatch({ type: 'SET_FILTER', filter })}
            className="capitalize"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-2 mb-4">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            <Button
              variant="outline"
              className="text-sm h-8 px-3"
              onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>

      {state.todos.some(todo => todo.completed) && (
        <Button
          variant="outline"
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="w-full"
        >
          Clear Completed
        </Button>
      )}

      <div className="mt-4 rounded bg-gray-50 p-3">
        <h4 className="text-sm font-semibold mb-2">State Summary:</h4>
        <div className="text-xs space-y-1">
          <p>Total: {state.todos.length}</p>
          <p>Active: {state.todos.filter(t => !t.completed).length}</p>
          <p>Completed: {state.todos.filter(t => t.completed).length}</p>
          <p>Current filter: {state.filter}</p>
        </div>
      </div>
    </div>
  );
};

const LocalStateExample = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Local State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li><strong>useState:</strong> Perfect for simple state like strings, numbers, booleans</li>
            <li><strong>useReducer:</strong> Better for complex state with multiple related values</li>
            <li>State is isolated to the component - doesn't affect other components</li>
            <li>Choose useState for simplicity, useReducer for complex state logic</li>
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Counter />
          <ToggleSwitch />
          <ContactForm />
          <TodoList />
        </div>

        <div className="mt-6 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">When to Use Local State:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Good for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Form input values</li>
                <li>UI toggle states (modals, dropdowns)</li>
                <li>Component-specific counters or timers</li>
                <li>Temporary data that doesn't need sharing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Avoid for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Data shared between multiple components</li>
                <li>Data that needs to persist across navigation</li>
                <li>Server-fetched data (use TanStack Query)</li>
                <li>Global application settings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LocalStateExample;