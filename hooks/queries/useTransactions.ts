import { useQuery } from '@tanstack/react-query';

interface Transaction {
  id: number;
  date: string;
  type: string;
  item: string;
  amount: number;
  status: string;
}

async function fetchTransactions(searchTerm: string = '') {
  // Replace with your actual API call
  const response = await fetch(`/api/transactions?search=${searchTerm}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

export function useTransactions(searchTerm: string = '') {
  return useQuery<Transaction[]>({
    queryKey: ['transactions', searchTerm],
    queryFn: () => fetchTransactions(searchTerm),
    staleTime: 30 * 1000, // 30 seconds
  });
} 