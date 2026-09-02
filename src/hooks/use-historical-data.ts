import { useQuery } from '@tanstack/react-query';

export interface ChartDataPoint {
  date: string;
  rate: number;
}

interface HistoricalApiResponse {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}

const fetchHistoricalData = async (from: string, to: string): Promise<ChartDataPoint[]> => {
  if (from === to) return [];

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 30);

  const end = endDate.toISOString().split('T')[0];
  const start = startDate.toISOString().split('T')[0];

  const response = await fetch(`https://api.frankfurter.dev/v1/${start}..${end}?base=${from}&symbols=${to}`);

  if (!response.ok) throw new Error('Failed to fetch historical data');

  const data = (await response.json()) as HistoricalApiResponse;
  
  const chartData: ChartDataPoint[] = [];
  
  for (const [dateStr, ratesObj] of Object.entries(data.rates)) {
    const rate = ratesObj[to];
    if (rate !== undefined) {
       const [, month, day] = dateStr.split('-');
       chartData.push({ date: `${day}/${month}`, rate });
    }
  }

  return chartData;
};

export function useHistoricalData(from: string, to: string) {
  return useQuery({
    queryKey: ['historical', from, to],
    queryFn: () => fetchHistoricalData(from, to),
    enabled: from !== to && !!from && !!to,
    staleTime: 1000 * 60 * 60 * 2,
  });
}