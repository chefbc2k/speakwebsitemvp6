'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const nftData = [
  { id: 1, name: 'Cosmic Voyage', creator: 'Artist1', price: '0.5 ETH', status: 'Listed' },
  { id: 2, name: 'Digital Dreams', creator: 'Artist2', price: '0.7 ETH', status: 'Pending' },
  { id: 3, name: 'Neon Nights', creator: 'Artist3', price: '0.3 ETH', status: 'Sold' },
];

export default function AdminNFTs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">NFT Listings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent NFT Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nftData.map((nft) => (
                <TableRow key={nft.id}>
                  <TableCell>{nft.id}</TableCell>
                  <TableCell>{nft.name}</TableCell>
                  <TableCell>{nft.creator}</TableCell>
                  <TableCell>{nft.price}</TableCell>
                  <TableCell>{nft.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}