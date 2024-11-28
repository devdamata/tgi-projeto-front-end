'use client';

import { useEffect } from 'react';
import { useTheme } from '@/app/hooks/useTheme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.className = theme; // Adiciona a classe do tema ao <html>
  }, [theme]);

  return <>{children}</>;
}
