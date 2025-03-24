import { getHeaders } from 'vinxi/http';

const getLanguageFromReferer = async () => {
  const headers = getHeaders();
  const referer = headers.referer;
  let lang = 'en-US';

  if (referer?.includes('.ca')) {
    lang = 'en-CA';
  }

  return lang;
};

export default getLanguageFromReferer;
