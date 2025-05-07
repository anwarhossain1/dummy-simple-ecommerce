'use client';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';

export type NextAppDirEmotionCacheProviderProps = {
  children: React.ReactNode;
};

const ThemeRegistryContext = React.createContext<{ cache: ReturnType<typeof createCache> | null }>({ cache: null });

export function useThemeRegistry() {
  return React.useContext(ThemeRegistryContext);
}

export default function ThemeRegistryProvider({ children }: NextAppDirEmotionCacheProviderProps) {
  const [cache] = React.useState(() => {
    const cache = createCache({ key: 'mui' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <ThemeRegistryContext.Provider value={{ cache }}>
      <DefaultCacheProvider value={cache}>{children}</DefaultCacheProvider>
    </ThemeRegistryContext.Provider>
  );
}