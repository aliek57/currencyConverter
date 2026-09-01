import { useTranslation } from 'react-i18next';
import { useCurrencies } from './hooks/use-currencies';

function App() {
  const { t } = useTranslation();
  const { data, isLoading, isError, error } = useCurrencies();

  return (
    <div className="text-3xl font-bold underline font-sans"> 
      {t('test.name')}
      {isLoading && <p className="text-sm font-normal text-gray-500 mt-4">Carregando...</p>}
      {isError && <p className="text-sm font-normal text-red-500 mt-4">{error.message}</p>}
      {data && (
        <p className="text-sm font-normal text-green-600 mt-4">
          Moedas carregadas: {Object.keys(data).length}
        </p>
      )}
    </div>
  );
}

export default App;