import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getCurrencySymbol = (currencyCode: string) => {
  try {
    const parts = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
    }).formatToParts(0);
    
    const symbol = parts.find(part => part.type === 'currency')?.value;

    if (symbol && symbol.length <= 3) {
        return symbol;
    } else {
        return currencyCode.charAt(0);
    }
  } catch (error) {
    return currencyCode.charAt(0); 
  }
};

export function CurrencyDropdown({ 
  label, 
  value, 
  onChange, 
  options, 
  getCurrencyName 
}: { 
  label: string; 
  value: string; 
  onChange: (val: string) => void; 
  options: string[]; 
  getCurrencyName: (code: string) => string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(code => 
    code.toLowerCase().includes(search.toLowerCase()) || 
    getCurrencyName(code).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef}>
      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">
        {label}
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-16 px-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl transition-colors cursor-pointer overflow-hidden"
      >
        <div className="flex items-center gap-3 w-[calc(100%-24px)]">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-white dark:bg-zinc-800 rounded-full text-lg font-bold text-zinc-700 dark:text-zinc-300 shadow-sm border border-zinc-200 dark:border-zinc-700">
            {getCurrencySymbol(value)}
          </div>
          <div className="flex flex-col items-start min-w-0 flex-1 overflow-hidden">
             <span className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                {value}
             </span>
             <span className="text-xs text-zinc-500 truncate w-full text-left leading-tight">
                {getCurrencyName(value)}
             </span>
          </div>
        </div>
        
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="flex-shrink-0 ml-2">
          <ChevronDown size={18} className="text-zinc-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[76px] left-0 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  autoFocus 
                  type="text"
                  placeholder={t('converter.search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-950 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            
            <div className="max-h-60 overflow-y-auto custom-scrollbar p-2">
              {filteredOptions.map((curr) => (
                <button
                  key={curr}
                  onMouseDown={() => {
                    onChange(curr);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl transition-colors cursor-pointer overflow-hidden ${
                    value === curr 
                    ? 'bg-emerald-50 dark:bg-emerald-950/30' 
                    : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold shadow-sm ${value === curr ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'}`}>
                    {getCurrencySymbol(curr)}
                  </div>
                  <div className="flex flex-col items-start min-w-0 flex-1 overflow-hidden">
                      <span className={`text-sm font-bold ${value === curr ? 'text-emerald-700 dark:text-emerald-400' : 'text-zinc-800 dark:text-zinc-200'}`}>
                        {curr}
                      </span>
                      <span className="text-xs text-zinc-500 truncate w-full text-left">
                        {getCurrencyName(curr)}
                      </span>
                  </div>
                </button>
              ))}
              {filteredOptions.length === 0 && (
                <div className="p-4 text-center text-sm text-zinc-500">{t('converter.no_results')}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}