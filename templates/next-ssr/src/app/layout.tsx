import '@/styles/index.css';
import getLanguageFromReferer from '@/i18n/getLanguageFromReferer';
import type { PropsWithChildren } from 'react';
import Providers from './Providers';

export default async function RootLayout({ children }: PropsWithChildren) {
  const lang = await getLanguageFromReferer();

  return (
    <html lang={lang} className="h-screen min-h-screen w-full overflow-auto">
      <body className="flex h-screen min-h-screen w-full flex-col overflow-auto">
        <Providers lang={lang}>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
