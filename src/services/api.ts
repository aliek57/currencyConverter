const BASE_URL = 'https://api.frankfurter.dev/v2';

export interface CurrenciesResponse {
  [currencyCode: string]: string;
}

export const fetchCurrencies = async (): Promise<CurrenciesResponse> => {
  const response = await fetch(`${BASE_URL}/currencies`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch currencies');
  }

  return response.json();
};