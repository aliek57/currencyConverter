import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme-context';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (Object.keys(context).length === 0) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}