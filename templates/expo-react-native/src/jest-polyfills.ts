/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Polyfill fetch globals for MSW compatibility in jsdom environment
require('cross-fetch/polyfill');

// Polyfill TextEncoder/TextDecoder — jsdom@20 doesn't include them.
// Node 18+ provides them via the 'util' module.
if (typeof global.TextEncoder === 'undefined') {
  const util = require('util');
  global.TextEncoder = util.TextEncoder;
  global.TextDecoder = util.TextDecoder;
}

// Polyfill Web Streams API globals (ReadableStream, WritableStream, TransformStream, etc.)
// jsdom@20 doesn't include these; Node 18+ provides them via 'stream/web'.
// MSW v2 requires these when initialising the server.
if (typeof global.TransformStream === 'undefined') {
  const webStreams = require('stream/web') as Record<string, unknown>;
  for (const [name, value] of Object.entries(webStreams)) {
    if (typeof (global as any)[name] === 'undefined') {
      (global as any)[name] = value;
    }
  }
}

// Polyfill BroadcastChannel — jsdom@20 doesn't include it; Node 18+ does.
if (typeof global.BroadcastChannel === 'undefined') {
  const workerThreads = require('worker_threads');
  (global as any).BroadcastChannel = workerThreads.BroadcastChannel;
}
