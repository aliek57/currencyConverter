import { useState } from 'react';
import { Header } from './components/header';
import { Converter } from './components/converter';
import { HistoricalChart } from './components/historical-chart';

function App() {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500 font-sans">
      <Header /> 
      
      <main className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch justify-center">
          
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <Converter 
              fromCurrency={fromCurrency} 
              setFromCurrency={setFromCurrency}
              toCurrency={toCurrency}
              setToCurrency={setToCurrency}
            />
          </div>

          <div className="w-full lg:w-1/2 flex-shrink-0">
            <HistoricalChart from={fromCurrency} to={toCurrency} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;