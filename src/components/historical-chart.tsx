import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useHistoricalData } from '../hooks/use-historical-data';
import { useTheme } from '../hooks/use-theme';

interface HistoricalChartProps {
  from: string;
  to: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
  toCurrency: string;
}

const CustomTooltip = ({ active, payload, label, toCurrency }: CustomTooltipProps) => {
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

  const [revealProgress, setRevealProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let percent = (x / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    setRevealProgress(percent);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    if (revealProgress > 50) {
      setRevealProgress(100);
    } else {
      setRevealProgress(0);
    }
  };

  if (from === to) {
    return (
       <div className="w-full h-[400px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] flex items-center justify-center shadow-sm p-6 text-center">
          <p className="text-zinc-500 font-medium">{t('chart.same_currency')}</p>
       </div>
    );
  }

  const isRevealed = revealProgress > 50;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5 }}
      className="w-full h-[400px] bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-[2rem] shadow-sm p-6 flex flex-col"
    >
       <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-6">
         {t('chart.title', { from, to })}
       </h3>
       
       <div className="w-full flex-grow relative select-none" style={{ minHeight: '250px' }} ref={containerRef}>
         {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 dark:border-lime-400"></div>
            </div>
         ) : isError || !data || data.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center z-30">
               <p className="text-red-500 dark:text-red-400 text-sm font-medium">{t('chart.error')}</p>
            </div>
         ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 50, left: -20, bottom: 0 }}>
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

              <div className="absolute inset-0 z-20 flex pointer-events-none rounded-xl overflow-hidden">               
                <div
                  className="absolute inset-0 bg-white/70 dark:bg-[#121214]/70 backdrop-blur-md transition-none"
                  style={{ clipPath: `inset(0 0 0 ${revealProgress}%)` }}
                />
                <div
                  className="absolute top-0 bottom-0 pointer-events-auto cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
                  style={{ left: `calc(${revealProgress}% - ${revealProgress * 0.48}px)` }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                >
                  <div className={`absolute top-0 bottom-0 w-[2px] bg-emerald-500/30 dark:bg-lime-400/30 transition-opacity ${revealProgress === 100 ? 'opacity-0' : 'opacity-100'}`} />
                  <motion.div
                    className="relative z-10 w-12 h-12 bg-emerald-500 dark:bg-lime-400 text-white dark:text-zinc-900 rounded-full flex items-center justify-center shadow-xl border border-emerald-400 dark:border-lime-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={isRevealed ? t('chart.hide') : t('chart.reveal')}
                  >
                    <motion.div
                      animate={{ x: isRevealed ? [0, -5, 0] : [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      {isRevealed ? <ArrowLeft size={20} /> : <ArrowRight size={20} />} 
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </>
         )}
       </div>
    </motion.div>
  );
}