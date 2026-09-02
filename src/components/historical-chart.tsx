import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useHistoricalData } from '../hooks/use-historical-data';
import { useTheme } from '../hooks/use-theme';

interface HistoricalChartProps {
  from: string;
  to: string;
}

const CustomTooltip = ({ active, payload, label, toCurrency }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3 rounded-xl shadow-xl">
        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold mb-1">{label}</p>
        <p className="text-emerald-600 dark:text-lime-400 font-black text-sm">
          {payload[0].value.toFixed(4)} {toCurrency}
        </p>
      </div>
    );
  }
  return null;
};

export function HistoricalChart({ from, to }: HistoricalChartProps) {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useHistoricalData(from, to);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const lineColor = isDark ? '#a3e635' : '#10b981';

  if (from === to) {
    return (
       <div className="w-full h-[400px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] flex items-center justify-center shadow-sm p-6 text-center">
          <p className="text-zinc-500 font-medium">{t('chart.same_currency')}</p>
       </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-sm p-6 flex flex-col">
       <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-6">
         {t('chart.title', { from, to })}
       </h3>
       
       <div className="w-full flex-grow relative" style={{ minHeight: '250px' }}>
         {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 dark:border-lime-400"></div>
            </div>
         ) : isError || !data || data.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <p className="text-red-500 dark:text-red-400 text-sm font-medium">{t('chart.error')}</p>
            </div>
         ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#52525b" strokeOpacity={0.15} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  dx={-10}
                  tickFormatter={(value) => value.toFixed(2)}
                  width={60} 
                />
                <Tooltip content={<CustomTooltip toCurrency={to} />} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke={lineColor} 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: lineColor, stroke: isDark ? '#18181b' : '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
         )}
       </div>
    </div>
  );
}