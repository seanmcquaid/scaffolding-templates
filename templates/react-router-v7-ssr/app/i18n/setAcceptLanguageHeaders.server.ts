const setAcceptLanguageHeaders = (request: Request) => {
  if (request.url.includes('.ca')) {
    request.headers.set('accept-language', 'en-CA');
  }
};

export default setAcceptLanguageHeaders;
