import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from './theme-toggle';
import { LanguageSelector } from './language-selector';

export function Header() {
  const { t } = useTranslation();

  const handleReset = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full p-4 md:p-6 flex justify-between items-center bg-transparent relative z-50">
      <motion.h1
        onClick={handleReset}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-xl md:text-2xl font-black tracking-tight cursor-pointer bg-gradient-to-b from-emerald-400 to-teal-700 dark:from-lime-300 dark:to-emerald-700 bg-clip-text text-transparent pb-1"
      >
        {t('converter.name')}
      </motion.h1>
      <div className="flex items-center gap-2 md:gap-4">
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}