import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLang = typeof i18n.language === 'string' ? i18n.language.substring(0, 2) : 'pt';

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-3 h-9 rounded-full bg-zinc-200 dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors text-zinc-800 dark:text-zinc-100 shadow-sm border border-zinc-300 dark:border-zinc-800"
      >
        <Globe size={16} className="text-emerald-600 dark:text-lime-400" />
        <span className="text-sm font-bold uppercase tracking-wider">{currentLang}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={14} className="text-zinc-500" />
        </motion.div>
      </motion.button>   
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col">
                <button
                  onClick={() => changeLanguage('pt')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold transition-all cursor-pointer border-l-2 ${
                      currentLang === 'pt' 
                      ? 'bg-emerald-50 dark:bg-lime-400/10 border-emerald-500 dark:border-lime-400 text-emerald-700 dark:text-lime-400' 
                      : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {t('language.pt')}
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`w-full flex items-center px-4 py-3 text-sm font-semibold transition-all cursor-pointer border-l-2 ${
                      currentLang === 'en' 
                      ? 'bg-emerald-50 dark:bg-lime-400/10 border-emerald-500 dark:border-lime-400 text-emerald-700 dark:text-lime-400' 
                      : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {t('language.en')}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}