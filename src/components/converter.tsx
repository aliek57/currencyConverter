import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';
import { useCurrencies } from '../hooks/use-currencies';
import { useDebounce } from '../hooks/use-debounce';
import { useConversion } from '../hooks/use-conversion';
import { CurrencyDropdown } from './currency-dropdown';

export function Converter() {
  const { t } = useTranslation();
  
  const { data: currencies, isLoading, isError } = useCurrencies();

  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');
  const [rotation, setRotation] = useState(0);

  const debouncedAmount = useDebounce(amount, 500);

  const { data: convertedAmount, isFetching } = useConversion(
    debouncedAmount,
    fromCurrency,
    toCurrency
  );

  const handleSwap = () => {
    setRotation(prev => prev + 180);
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['e', 'E', '+', '-'].includes(e.key)) {
      e.preventDefault();
    }
  };

  if (isLoading) return null;

  if (isError || !currencies) {
    return (
      <div className="w-full p-6 rounded-3xl bg-red-50 dark:bg-red-950/30 text-center text-red-600 dark:text-red-400">
        {t('converter.error')}
      </div>
    );
  }

  let currencyOptions: string[] = [];
  if (Array.isArray(currencies)) {
    currencyOptions = currencies.map((c: any) => c.iso_code).filter(Boolean).sort();
  } else {
    currencyOptions = Object.keys(currencies).sort();
  }

  const getCurrencyName = (code: string) => {
    if (!currencies) return code;
    
    if (Array.isArray(currencies)) {
      const found = currencies.find((c: any) => c.iso_code === code);
      return found?.name || code;
    }
    
    const currencyData = (currencies as any)[code];
    return typeof currencyData === 'string' ? currencyData : (currencyData?.name || code);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full p-6 md:p-8 rounded-[2rem] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 shadow-sm relative z-10"
    >
      <div className="flex flex-col gap-6 w-full">       
        <div className="flex flex-col w-full relative gap-4">      
          <div className="w-full">
             <CurrencyDropdown 
              label={t('converter.from')} 
              value={fromCurrency} 
              onChange={setFromCurrency} 
              options={currencyOptions} 
              getCurrencyName={getCurrencyName} 
            />
          </div>
          
           <div className="flex justify-center -my-1 z-10">
            <motion.button
              onClick={handleSwap}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 dark:bg-lime-400 text-white dark:text-black p-2 rounded-full shadow-md hover:bg-emerald-600 dark:hover:bg-lime-600 transition-colors border-4 border-white dark:border-[#121214] cursor-pointer"
            >
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ArrowUpDown size={18} />
              </motion.div>
            </motion.button>
          </div>

          <div className="w-full">
            <CurrencyDropdown 
              label={t('converter.to')} 
              value={toCurrency} 
              onChange={setToCurrency} 
              options={currencyOptions} 
              getCurrencyName={getCurrencyName} 
            />
          </div>
        </div>

        <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/50 rounded-full my-2" />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">
              {t('converter.amount')}
            </label>
            <div className="relative w-full">
              <input
                type="number"
                min="0"
                value={amount}
                onKeyDown={handleKeyDown}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full min-w-0 h-14 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 text-xl md:text-2xl font-black text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">
              {t('converter.converted')}
            </label>
            <div className="relative w-full">
              <div className={`w-full min-w-0 h-14 flex items-center bg-zinc-100/50 dark:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl px-4 text-xl md:text-2xl font-black text-emerald-600 dark:text-lime-400 overflow-hidden transition-opacity duration-300 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                <span className="truncate w-full">
                   {convertedAmount !== undefined ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>       
      </div>
    </motion.div>
  );
}