'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface NFT {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  sales: number;
}

const nftData: NFT[] = [
  { id: 1, name: 'Cosmic Voyage', image: 'https://picsum.photos/200/300?random=1', description: 'A journey through the cosmos', price: 0.5, sales: 10 },
  { id: 2, name: 'Digital Dreams', image: 'https://picsum.photos/200/300?random=2', description: 'Surreal digital landscapes', price: 0.7, sales: 15 },
  { id: 3, name: 'Neon Nights', image: 'https://picsum.photos/200/300?random=3', description: 'Vibrant city nightscapes', price: 0.3, sales: 8 },
  { id: 4, name: 'Pixel Paradise', image: 'https://picsum.photos/200/300?random=4', description: 'Retro-inspired pixel art', price: 0.4, sales: 12 },
  { id: 5, name: 'Abstract Realms', image: 'https://picsum.photos/200/300?random=5', description: 'Mind-bending abstract art', price: 0.6, sales: 18 },
];

const NFTCard = ({ nft }: { nft: NFT }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{nft.name}</CardTitle>
      <CardDescription>{nft.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded-md" />
      <div className="mt-4">
        <p>Price: {nft.price} ETH</p>
        <p>Sales: {nft.sales}</p>
      </div>
    </CardContent>
    <CardFooter>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={[{ name: 'Sales', value: nft.sales }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardFooter>
  </Card>
);

export default function NFTCollection() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredNFTs = nftData.filter(nft => 
    nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input
        type="text"
        placeholder="Search NFTs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-sm"
      />

      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNFTs.map(nft => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <div className="space-y-4">
            {filteredNFTs.map(nft => (
              <div key={nft.id} className="flex items-center space-x-4 border p-4 rounded-md">
                <img src={nft.image} alt={nft.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="font-semibold">{nft.name}</h3>
                  <p>{nft.description}</p>
                  <p>Price: {nft.price} ETH | Sales: {nft.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <h3 className="text-xl font-semibold mt-8 mb-4">Featured NFTs</h3>
      <Carousel>
        <CarouselContent>
          {nftData.map(nft => (
            <CarouselItem key={nft.id} className="md:basis-1/2 lg:basis-1/3">
              <NFTCard nft={nft} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}