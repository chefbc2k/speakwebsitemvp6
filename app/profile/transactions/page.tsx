'use client';

import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const transactionData = [
  { id: 1, date: '2023-05-01', type: 'Sale', item: 'Cosmic Voyage', amount: 0.5, status: 'Completed' },
  { id: 2, date: '2023-05-03', type: 'Purchase', item: 'Digital Dreams', amount: 0.7, status: 'Completed' },
  { id: 3, date: '2023-05-05', type: 'Sale', item: 'Neon Nights', amount: 0.3, status: 'Pending' },
  { id: 4, date: '2023-05-07', type: 'Purchase', item: 'Pixel Paradise', amount: 0.4, status: 'Completed' },
  { id: 5, date: '2023-05-09', type: 'Sale', item: 'Abstract Realms', amount: 0.6, status: 'Completed' },
];

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTransactions = transactionData.filter(transaction => 
    transaction.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm"
      />

      <Table>
        <TableCaption>A list of your recent transactions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Amount (ETH)</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.item}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}