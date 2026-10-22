import env from '@/env';

const prepareMsw = async () => {
  if (env.MODE === 'development' && env.VITE_APP_MSW_ENABLED) {
    const worker = await import('@/mocks/worker');
    worker.default.start({ onUnhandledFrame: 'bypass' });
  }

  return Promise.resolve();
};

export default prepareMsw;
