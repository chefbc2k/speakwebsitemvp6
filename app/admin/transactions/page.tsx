'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminTransactions() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Transaction History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Transaction history will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}