'use client';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import ThemeRegistryProvider from './EmotionCache';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeRegistryProvider>
  );
}