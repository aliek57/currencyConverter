import { useTranslation } from 'react-i18next';
import { Header } from './components/header';
import { Converter } from './components/converter';

function App() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 font-sans">
      <Header /> 
      
      <main className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-center">
          
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <Converter />
          </div>

          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="w-full h-96 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] flex items-center justify-center shadow-sm">
              <p className="text-zinc-500 font-medium">{t('chart.loading')}</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;