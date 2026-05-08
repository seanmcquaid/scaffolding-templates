import env from '@/env';
import worker from '@/mocks/worker';

const prepareMsw = async () => {
  if (env.VITE_APP_MSW_ENABLED) {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};

export default prepareMsw;
