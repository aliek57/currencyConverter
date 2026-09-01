import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-[60px] h-9 bg-zinc-200 dark:bg-zinc-900 rounded-full p-1 cursor-pointer transition-colors border border-zinc-300 dark:border-zinc-800 shadow-sm"
    >
      <motion.div
        className="absolute left-1 w-7 h-7 bg-white dark:bg-zinc-950 rounded-full shadow-md border border-zinc-200 dark:border-zinc-800"
        initial={false}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <div className="relative z-10 w-full flex justify-between items-center px-1">
        <Sun size={14} className={`transition-colors duration-300 ${!isDark ? 'text-amber-500' : 'text-zinc-500'}`} />
        <Moon size={14} className={`transition-colors duration-300 ${isDark ? 'text-lime-400' : 'text-zinc-400'}`} />
      </div>
    </button>
  );
}