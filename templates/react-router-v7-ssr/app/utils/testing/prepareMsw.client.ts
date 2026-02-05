import clientEnv from '@/env.client';

const prepareMsw = async () => {
  if (clientEnv.MODE === 'development' && clientEnv.VITE_APP_MSW_ENABLED) {
    const worker = await import('../../../mocks/worker');
    worker.default.start({ onUnhandledRequest: 'bypass' });
  }

  return Promise.resolve();
};

export default prepareMsw;
