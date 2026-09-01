import { useQuery } from '@tanstack/react-query';

interface ConversionResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    [currency: string]: number;
  };
}

const fetchConversion = async (amount: string, from: string, to: string) => {
  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return 0;
  if (from === to) return Number(amount);

  const response = await fetch(`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${from}&to=${to}`);
  
  if (!response.ok) throw new Error('Erro ao converter');
  
  const data: ConversionResponse = await response.json();
  return data.rates[to];
};

export function useConversion(amount: string, from: string, to: string) {
  return useQuery({
   queryKey: ['conversion', amount, from, to],
    queryFn: () => fetchConversion(amount, from, to),
    enabled: !!amount && Number(amount) > 0,
    staleTime: 1000 * 60 * 2,
  });
}