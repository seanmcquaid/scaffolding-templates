import env from '@/env';

const prepareMsw = async () => {
  if (env.MODE === 'development' && env.VITE_APP_MSW_ENABLED) {
    const server = await import('../../../mocks/server');
    server.default.listen();
  }

  return Promise.resolve();
};

export default prepareMsw;
