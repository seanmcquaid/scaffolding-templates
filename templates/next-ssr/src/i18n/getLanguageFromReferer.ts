import { headers } from 'next/headers';

const getLanguageFromReferer = async () => {
  const { get } = await headers();
  const referer = get('referer') ?? '';
  let lang = 'en-US';

  if (referer.includes('.ca')) {
    lang = 'en-CA';
  }

  return lang;
};

export default getLanguageFromReferer;
