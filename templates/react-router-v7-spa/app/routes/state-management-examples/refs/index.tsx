import { useState, useRef, useEffect } from 'react';
import { href } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';

// Focus management example
const FocusManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const step1Ref = useRef<HTMLInputElement>(null);
  const step2Ref = useRef<HTMLInputElement>(null);
  const step3Ref = useRef<HTMLTextAreaElement>(null);
  const modalButtonRef = useRef<HTMLButtonElement>(null);
  const firstModalInputRef = useRef<HTMLInputElement>(null);

  // Focus next step when advancing
  const nextStep = () => {
    setCurrentStep(prev => {
      const next = prev + 1;
      // Focus next input after state update
      setTimeout(() => {
        if (next === 2) step2Ref.current?.focus();
        if (next === 3) step3Ref.current?.focus();
      }, 0);
      return next;
    });
  };

  const prevStep = () => {
    setCurrentStep(prev => {
      const previous = prev - 1;
      setTimeout(() => {
        if (previous === 1) step1Ref.current?.focus();
        if (previous === 2) step2Ref.current?.focus();
      }, 0);
      return previous;
    });
  };

  // Focus first input when modal opens
  useEffect(() => {
    if (showModal) {
      setTimeout(() => firstModalInputRef.current?.focus(), 100);
    } else {
      // Return focus to button that opened modal
      modalButtonRef.current?.focus();
    }
  }, [showModal]);

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Focus Management with useRef</h3>
      
      <div className="space-y-4">
        {/* Multi-step form */}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="mb-3 font-medium">Step {currentStep} of 3</h4>
          
          {currentStep === 1 && (
            <div>
              <label className="block text-sm font-medium mb-1">First Name:</label>
              <Input ref={step1Ref} placeholder="Enter your first name" />
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium mb-1">Email:</label>
              <Input ref={step2Ref} type="email" placeholder="Enter your email" />
            </div>
          )}
          
          {currentStep === 3 && (
            <div>
              <label className="block text-sm font-medium mb-1">Message:</label>
              <textarea
                ref={step3Ref}
                className="w-full rounded border p-2 min-h-[100px]"
                placeholder="Enter your message"
              />
            </div>
          )}
          
          <div className="flex gap-2 mt-4">
            {currentStep > 1 && (
              <Button onClick={prevStep} variant="outline">
                Previous
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <Button>Submit</Button>
            )}
          </div>
        </div>

        {/* Modal example */}
        <div>
          <Button
            ref={modalButtonRef}
            onClick={() => setShowModal(true)}
            variant="outline"
          >
            Open Modal (Focus Demo)
          </Button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 max-w-md rounded-lg bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold">Modal with Focus Management</h4>
            <div className="space-y-3">
              <Input ref={firstModalInputRef} placeholder="This input gets focus" />
              <Input placeholder="Tab to navigate to this input" />
              <div className="flex gap-2">
                <Button onClick={() => setShowModal(false)} variant="outline">
                  Cancel
                </Button>
                <Button onClick={() => setShowModal(false)}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// DOM measurement example
const DOMmeasurements = () => {
  const [measurements, setMeasurements] = useState({
    width: 0,
    height: 0,
    scrollHeight: 0,
    scrollTop: 0,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const measureElement = () => {
    if (containerRef.current && contentRef.current) {
      const container = containerRef.current;
      const content = contentRef.current;
      
      setMeasurements({
        width: container.clientWidth,
        height: container.clientHeight,
        scrollHeight: content.scrollHeight,
        scrollTop: container.scrollTop,
      });
    }
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    if (containerRef.current && contentRef.current) {
      containerRef.current.scrollTo({ 
        top: contentRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  // Initial measurement
  useEffect(() => {
    measureElement();
  }, []);

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">DOM Measurements with useRef</h3>
      
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={measureElement} variant="outline">
            Measure Element
          </Button>
          <Button onClick={scrollToTop} variant="outline">
            Scroll to Top
          </Button>
          <Button onClick={scrollToBottom} variant="outline">
            Scroll to Bottom
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Scrollable content */}
          <div>
            <h4 className="mb-2 font-medium">Scrollable Content:</h4>
            <div
              ref={containerRef}
              className="h-40 overflow-y-auto border rounded p-3 bg-gray-50"
              onScroll={measureElement}
            >
              <div ref={contentRef}>
                {Array.from({ length: 20 }, (_, i) => (
                  <p key={i} className="mb-2 text-sm">
                    This is paragraph {i + 1}. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua.
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Measurements display */}
          <div>
            <h4 className="mb-2 font-medium">Live Measurements:</h4>
            <div className="space-y-2 text-sm bg-white border rounded p-3">
              <div className="flex justify-between">
                <span>Container Width:</span>
                <span className="font-mono">{measurements.width}px</span>
              </div>
              <div className="flex justify-between">
                <span>Container Height:</span>
                <span className="font-mono">{measurements.height}px</span>
              </div>
              <div className="flex justify-between">
                <span>Content Height:</span>
                <span className="font-mono">{measurements.scrollHeight}px</span>
              </div>
              <div className="flex justify-between">
                <span>Scroll Position:</span>
                <span className="font-mono">{measurements.scrollTop}px</span>
              </div>
              <div className="flex justify-between">
                <span>Scroll Progress:</span>
                <span className="font-mono">
                  {measurements.scrollHeight > measurements.height 
                    ? Math.round((measurements.scrollTop / (measurements.scrollHeight - measurements.height)) * 100)
                    : 0
                  }%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Timer with ref example (value that doesn't trigger re-render)
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - seconds * 1000;
      
      intervalRef.current = setInterval(() => {
        setSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 100);
    }
  };

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  const reset = () => {
    pause();
    setSeconds(0);
    startTimeRef.current = 0;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Timer with useRef (Non-rendering Values)</h3>
      
      <div className="text-center space-y-4">
        <div className="text-4xl font-mono font-bold">
          {formatTime(seconds)}
        </div>
        
        <div className="flex justify-center gap-2">
          {!isRunning ? (
            <Button onClick={start}>Start</Button>
          ) : (
            <Button onClick={pause} variant="outline">Pause</Button>
          )}
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>This timer uses useRef to store the interval ID and start time.</p>
          <p>These values don't trigger re-renders when changed.</p>
        </div>
      </div>
    </div>
  );
};

// Previous/current value tracking
const ValueTracker = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  const prevCountRef = useRef<number | undefined>(undefined);
  const prevNameRef = useRef<string | undefined>(undefined);

  // Store previous values after each render
  useEffect(() => {
    prevCountRef.current = count;
    prevNameRef.current = name;
  });

  const prevCount = prevCountRef.current;
  const prevName = prevNameRef.current;

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-4 text-lg font-semibold">Previous Value Tracking with useRef</h3>
      
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium mb-1">Counter:</label>
            <div className="flex gap-2">
              <Button onClick={() => setCount(c => c - 1)} variant="outline">-</Button>
              <Button onClick={() => setCount(c => c + 1)}>+</Button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name"
            />
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium mb-2">Current vs Previous Values:</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>Current count:</span>
              <span className="font-mono">{count}</span>
            </div>
            <div className="flex justify-between">
              <span>Previous count:</span>
              <span className="font-mono">{prevCount ?? 'undefined'}</span>
            </div>
            <div className="flex justify-between">
              <span>Count changed:</span>
              <span className="font-mono">{String(count !== prevCount)}</span>
            </div>
            <div className="border-t pt-2 mt-2"></div>
            <div className="flex justify-between">
              <span>Current name:</span>
              <span className="font-mono">"{name}"</span>
            </div>
            <div className="flex justify-between">
              <span>Previous name:</span>
              <span className="font-mono">"{prevName ?? ''}"</span>
            </div>
            <div className="flex justify-between">
              <span>Name changed:</span>
              <span className="font-mono">{String(name !== prevName)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RefsExample = () => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Refs State Management</h1>
          <LinkButton to={href('/state-management-examples')} variant="outline">
            ← Back to Examples
          </LinkButton>
        </div>

        <div className="mb-6 rounded-lg bg-blue-50 p-4">
          <h2 className="mb-2 text-lg font-semibold">Key Concepts:</h2>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            <li>Refs store mutable values that don't trigger re-renders</li>
            <li>Perfect for DOM references, timers, and tracking previous values</li>
            <li>Access DOM elements directly for focus, scroll, measurements</li>
            <li>Store values that need to persist between renders but aren't "state"</li>
          </ul>
        </div>

        <div className="space-y-8">
          <FocusManagement />
          <DOMmeasurements />
          <Timer />
          <ValueTracker />
        </div>

        <div className="mt-8 rounded-lg bg-yellow-50 p-4">
          <h3 className="mb-2 text-lg font-semibold">When to Use Refs:</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-green-700">✓ Use refs for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>DOM element references (focus, scroll, measure)</li>
                <li>Timer IDs, subscription IDs</li>
                <li>Tracking previous values</li>
                <li>Mutable values that don't affect rendering</li>
                <li>Integrating with third-party DOM libraries</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700">✗ Don't use refs for:</h4>
              <ul className="mt-1 text-sm text-gray-700 list-disc pl-4">
                <li>Data that should trigger re-renders (use useState)</li>
                <li>Derived state (calculate during render)</li>
                <li>Event handlers (use props/callbacks)</li>
                <li>Anything that affects the UI display</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded">
            <p className="text-sm">
              <strong>💡 Remember:</strong> Changing a ref's current value doesn't trigger a re-render. 
              If you need the component to re-render when a value changes, use useState instead.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RefsExample;