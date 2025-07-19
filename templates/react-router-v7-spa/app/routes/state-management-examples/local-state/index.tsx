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
        <div className="flex justify-center gap-2">
          <Button onClick={() => setCount(c => c - step)} variant="outline">
            -{step}
          </Button>
          <Button onClick={() => setCount(0)} variant="outline">
            Reset
          </Button>
          <Button onClick={() => setCount(c => c + step)}>+{step}</Button>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Step:</label>
          <Input
            type="number"
            min="1"
            value={step}
            onChange={e => setStep(parseInt(e.target.value) || 1)}
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
            } ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
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
          <p className="text-sm">
            Status: <strong>{isOn ? 'ON' : 'OFF'}</strong>
          </p>
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

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        <div className="py-8 text-center">
          <div className="mb-2 text-4xl text-green-600">✓</div>
          <p className="font-semibold text-green-600">
            Form submitted successfully!
          </p>
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
          className="min-h-[100px] w-full rounded border p-2"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange('message')}
          required
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      <div className="mt-4 rounded bg-gray-50 p-3">
        <h4 className="mb-2 text-sm font-semibold">Form State:</h4>
        <pre className="text-xs">
          {JSON.stringify({ ...formData, isSubmitting }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Form wizard component demonstrating useReducer for complex UI state
interface WizardState {
  currentStep: number;
  steps: {
    personal: {
      firstName: string;
      lastName: string;
      email: string;
    };
    preferences: {
      theme: 'light' | 'dark' | 'auto';
      notifications: boolean;
      newsletter: boolean;
    };
    confirmation: {
      agreedToTerms: boolean;
      agreedToPrivacy: boolean;
    };
  };
  errors: {
    [key: string]: string;
  };
  isSubmitting: boolean;
  isCompleted: boolean;
}

type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | {
      type: 'UPDATE_PERSONAL';
      field: keyof WizardState['steps']['personal'];
      value: string;
    }
  | {
      type: 'UPDATE_PREFERENCES';
      field: keyof WizardState['steps']['preferences'];
      value: any;
    }
  | {
      type: 'UPDATE_CONFIRMATION';
      field: keyof WizardState['steps']['confirmation'];
      value: boolean;
    }
  | { type: 'SET_ERROR'; field: string; message: string }
  | { type: 'CLEAR_ERROR'; field: string }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'COMPLETE_WIZARD' }
  | { type: 'RESET_WIZARD' };

const validateStep = (state: WizardState, step: number): string[] => {
  const errors: string[] = [];

  switch (step) {
    case 0: // Personal info
      if (!state.steps.personal.firstName.trim())
        errors.push('First name is required');
      if (!state.steps.personal.lastName.trim())
        errors.push('Last name is required');
      if (!state.steps.personal.email.trim()) errors.push('Email is required');
      else if (!/\S+@\S+\.\S+/.test(state.steps.personal.email))
        errors.push('Email is invalid');
      break;
    case 2: // Confirmation
      if (!state.steps.confirmation.agreedToTerms)
        errors.push('You must agree to terms');
      if (!state.steps.confirmation.agreedToPrivacy)
        errors.push('You must agree to privacy policy');
      break;
  }

  return errors;
};

const wizardReducer = (
  state: WizardState,
  action: WizardAction,
): WizardState => {
  switch (action.type) {
    case 'NEXT_STEP': {
      const errors = validateStep(state, state.currentStep);
      if (errors.length > 0) return state; // Don't advance if validation fails

      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 2),
        errors: {},
      };
    }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
        errors: {},
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
        errors: {},
      };
    case 'UPDATE_PERSONAL':
      return {
        ...state,
        steps: {
          ...state.steps,
          personal: {
            ...state.steps.personal,
            [action.field]: action.value,
          },
        },
        errors: {
          ...state.errors,
          [action.field]: '', // Clear error when user types
        },
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        steps: {
          ...state.steps,
          preferences: {
            ...state.steps.preferences,
            [action.field]: action.value,
          },
        },
      };
    case 'UPDATE_CONFIRMATION':
      return {
        ...state,
        steps: {
          ...state.steps,
          confirmation: {
            ...state.steps.confirmation,
            [action.field]: action.value,
          },
        },
        errors: {
          ...state.errors,
          [action.field]: '', // Clear error when user checks
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.value,
      };
    case 'COMPLETE_WIZARD':
      return {
        ...state,
        isCompleted: true,
        isSubmitting: false,
      };
    case 'RESET_WIZARD':
      return {
        currentStep: 0,
        steps: {
          personal: { firstName: '', lastName: '', email: '' },
          preferences: {
            theme: 'light',
            notifications: true,
            newsletter: false,
          },
          confirmation: { agreedToTerms: false, agreedToPrivacy: false },
        },
        errors: {},
        isSubmitting: false,
        isCompleted: false,
      };
    default:
      return state;
  }
};

const FormWizard = () => {
  const [state, dispatch] = useReducer(wizardReducer, {
    currentStep: 0,
    steps: {
      personal: { firstName: '', lastName: '', email: '' },
      preferences: { theme: 'light', notifications: true, newsletter: false },
      confirmation: { agreedToTerms: false, agreedToPrivacy: false },
    },
    errors: {},
    isSubmitting: false,
    isCompleted: false,
  });

  const stepTitles = ['Personal Info', 'Preferences', 'Confirmation'];
  const canProceed = validateStep(state, state.currentStep).length === 0;

  const handleNext = () => {
    const errors = validateStep(state, state.currentStep);
    if (errors.length > 0) {
      errors.forEach((error, index) => {
        const field =
          state.currentStep === 0
            ? ['firstName', 'lastName', 'email'][index] || 'general'
            : state.currentStep === 2
              ? ['agreedToTerms', 'agreedToPrivacy'][index] || 'general'
              : 'general';
        dispatch({ type: 'SET_ERROR', field, message: error });
      });
      return;
    }
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleSubmit = async () => {
    dispatch({ type: 'SET_SUBMITTING', value: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    dispatch({ type: 'COMPLETE_WIZARD' });
  };

  if (state.isCompleted) {
    return (
      <div className="rounded-lg border p-4">
        <h3 className="mb-4 text-lg font-semibold">Form Wizard (useReducer)</h3>
        <div className="py-8 text-center">
          <div className="mb-2 text-4xl text-green-600">🎉</div>
          <p className="mb-4 font-semibold text-green-600">
            Setup completed successfully!
          </p>
          <Button onClick={() => dispatch({ type: 'RESET_WIZARD' })}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Form Wizard (useReducer)</h3>

      {/* Step indicator */}
      <div className="mb-6 flex justify-between">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`flex-1 text-center ${
              index === state.currentStep
                ? 'font-semibold text-blue-600'
                : index < state.currentStep
                  ? 'text-green-600'
                  : 'text-gray-400'
            }`}
          >
            <div
              className={`mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full ${
                index === state.currentStep
                  ? 'bg-blue-600 text-white'
                  : index < state.currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200'
              }`}
            >
              {index < state.currentStep ? '✓' : index + 1}
            </div>
            <div className="text-xs">{title}</div>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="mb-6 min-h-[200px]">
        {state.currentStep === 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Personal Information</h4>
            <Input
              placeholder="First Name"
              value={state.steps.personal.firstName}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_PERSONAL',
                  field: 'firstName',
                  value: e.target.value,
                })
              }
            />
            {state.errors.firstName && (
              <p className="text-sm text-red-500">{state.errors.firstName}</p>
            )}

            <Input
              placeholder="Last Name"
              value={state.steps.personal.lastName}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_PERSONAL',
                  field: 'lastName',
                  value: e.target.value,
                })
              }
            />
            {state.errors.lastName && (
              <p className="text-sm text-red-500">{state.errors.lastName}</p>
            )}

            <Input
              type="email"
              placeholder="Email"
              value={state.steps.personal.email}
              onChange={e =>
                dispatch({
                  type: 'UPDATE_PERSONAL',
                  field: 'email',
                  value: e.target.value,
                })
              }
            />
            {state.errors.email && (
              <p className="text-sm text-red-500">{state.errors.email}</p>
            )}
          </div>
        )}

        {state.currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Preferences</h4>

            <div>
              <label className="mb-2 block text-sm font-medium">Theme</label>
              <select
                value={state.steps.preferences.theme}
                onChange={e =>
                  dispatch({
                    type: 'UPDATE_PREFERENCES',
                    field: 'theme',
                    value: e.target.value,
                  })
                }
                className="w-full rounded border p-2"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={state.steps.preferences.notifications}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_PREFERENCES',
                      field: 'notifications',
                      value: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                Enable notifications
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={state.steps.preferences.newsletter}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_PREFERENCES',
                      field: 'newsletter',
                      value: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                Subscribe to newsletter
              </label>
            </div>
          </div>
        )}

        {state.currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="font-semibold">Confirmation</h4>

            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={state.steps.confirmation.agreedToTerms}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_CONFIRMATION',
                      field: 'agreedToTerms',
                      value: e.target.checked,
                    })
                  }
                  className="mt-1 mr-2"
                />
                <span className="text-sm">I agree to the Terms of Service</span>
              </label>
              {state.errors.agreedToTerms && (
                <p className="ml-6 text-sm text-red-500">
                  {state.errors.agreedToTerms}
                </p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={state.steps.confirmation.agreedToPrivacy}
                  onChange={e =>
                    dispatch({
                      type: 'UPDATE_CONFIRMATION',
                      field: 'agreedToPrivacy',
                      value: e.target.checked,
                    })
                  }
                  className="mt-1 mr-2"
                />
                <span className="text-sm">I agree to the Privacy Policy</span>
              </label>
              {state.errors.agreedToPrivacy && (
                <p className="ml-6 text-sm text-red-500">
                  {state.errors.agreedToPrivacy}
                </p>
              )}
            </div>

            <div className="rounded bg-gray-50 p-4">
              <h5 className="mb-2 font-medium">Review your information:</h5>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Name:</strong> {state.steps.personal.firstName}{' '}
                  {state.steps.personal.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {state.steps.personal.email}
                </p>
                <p>
                  <strong>Theme:</strong> {state.steps.preferences.theme}
                </p>
                <p>
                  <strong>Notifications:</strong>{' '}
                  {state.steps.preferences.notifications
                    ? 'Enabled'
                    : 'Disabled'}
                </p>
                <p>
                  <strong>Newsletter:</strong>{' '}
                  {state.steps.preferences.newsletter ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          disabled={state.currentStep === 0}
        >
          Previous
        </Button>

        {state.currentStep < 2 ? (
          <Button onClick={handleNext} disabled={!canProceed}>
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed || state.isSubmitting}
          >
            {state.isSubmitting ? 'Submitting...' : 'Complete Setup'}
          </Button>
        )}
      </div>

      <div className="mt-4 rounded bg-gray-50 p-3">
        <h4 className="mb-2 text-sm font-semibold">Wizard State:</h4>
        <div className="space-y-1 text-xs">
          <p>Current step: {state.currentStep + 1}/3</p>
          <p>Can proceed: {canProceed ? 'Yes' : 'No'}</p>
          <p>
            Errors:{' '}
            {Object.keys(state.errors).filter(k => state.errors[k]).length}
          </p>
          <p>Submitting: {state.isSubmitting ? 'Yes' : 'No'}</p>
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
            <li>
              <strong>useState:</strong> Perfect for simple state like strings,
              numbers, booleans
            </li>
            <li>
              <strong>useReducer:</strong> Better for complex UI state with
              multiple related values and complex logic
            </li>
            <li>
              State is isolated to the component - doesn't affect other
              components
            </li>
            <li>
              Choose useState for simplicity, useReducer for complex state
              transitions and validation
            </li>
          </ul>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Counter />
          <ToggleSwitch />
          <ContactForm />
          <FormWizard />
        </div>

        <div className="mt-6 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">
            When to Use Local State:
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Good for:</h4>
              <ul className="mt-1 list-disc pl-4 text-sm text-gray-700">
                <li>Form input values and validation</li>
                <li>Multi-step wizards and UI flows</li>
                <li>UI toggle states (modals, dropdowns)</li>
                <li>Component-specific counters or timers</li>
                <li>Temporary data that doesn't need sharing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Avoid for:</h4>
              <ul className="mt-1 list-disc pl-4 text-sm text-gray-700">
                <li>Data shared between multiple components</li>
                <li>Data that needs to persist across navigation</li>
                <li>Server-fetched data (use TanStack Query)</li>
                <li>Global application settings</li>
                <li>Data that requires persistence</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LocalStateExample;
