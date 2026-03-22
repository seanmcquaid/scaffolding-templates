/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

// Polyfill Fetch API globals for MSW v2 compatibility in jsdom.
// jest-environment-jsdom@29 uses jsdom v20 which doesn't include
// fetch, Response, Request, etc. cross-fetch provides them.
require('cross-fetch/polyfill');

// Web Streams — jsdom v20 doesn't include these; Node 18+ has them via 'stream/web'.
// MSW v2 requires TransformStream, ReadableStream, etc.
if (typeof globalThis.TransformStream === 'undefined') {
  const webStreams = require('stream/web') as Record<string, unknown>;
  for (const [name, value] of Object.entries(webStreams)) {
    if (typeof (globalThis as any)[name] === 'undefined') {
      (globalThis as any)[name] = value;
    }
  }
}

// TextEncoder/TextDecoder
if (typeof globalThis.TextEncoder === 'undefined') {
  const util = require('util');
  (globalThis as any).TextEncoder = util.TextEncoder;
  (globalThis as any).TextDecoder = util.TextDecoder;
}

// BroadcastChannel
if (typeof globalThis.BroadcastChannel === 'undefined') {
  const { BroadcastChannel } = require('worker_threads');
  (globalThis as any).BroadcastChannel = BroadcastChannel;
}

// Set environment variables so the real @/env module's Zod validation passes.
// This avoids needing a moduleNameMapper mock for @/env.
process.env.EXPO_PUBLIC_API_URL ??= 'https://jsonplaceholder.typicode.com';
process.env.EXPO_PUBLIC_APP_NAME ??= 'expo-react-native';
process.env.EXPO_PUBLIC_APP_VERSION ??= '0.0.0';

// localStorage — react-native env doesn't provide it; usehooks-ts needs it.
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map<string, string>();
  (globalThis as any).localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    get length() {
      return store.size;
    },
    key: (index: number) => [...store.keys()][index] ?? null,
  };
}
