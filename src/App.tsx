import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <div className="text-3xl font-bold underline font-sans"> 
      {t('test.name')}
    </div>
  );
}

export default App;