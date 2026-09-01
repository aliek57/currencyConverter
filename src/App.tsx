import { useTranslation } from 'react-i18next';
import { useCurrencies } from './hooks/use-currencies';
import { Header } from './components/header';

function App() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useCurrencies();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 font-sans">
      <Header />       
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 gap-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-b from-emerald-500 to-teal-800 dark:from-lime-300 dark:to-emerald-700 bg-clip-text text-transparent pb-2">
            {t('test.title')}
          </h2>         
          {isLoading && <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-4">Carregando...</p>}
          {isError && <p className="text-sm font-medium text-red-500 mt-4">{error.message}</p>}
          {data && (
            <div className="inline-block px-6 py-2 rounded-full border border-emerald-200 dark:border-lime-500/30 bg-emerald-50/50 dark:bg-lime-500/10 backdrop-blur-sm mt-6">
              <p className="text-lg font-bold text-emerald-700 dark:text-lime-400">
                {t('test.currencies_loaded', { count: Object.keys(data).length })}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;