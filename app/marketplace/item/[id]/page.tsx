import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';

const nftData = {
  id: 1,
  name: 'Cosmic Voyage',
  image: 'https://picsum.photos/seed/1/600/400',
  price: 0.5,
  creator: 'Artist1',
  description: 'A journey through the cosmos, captured in a stunning digital artwork.',
  attributes: [
    { trait_type: 'Background', value: 'Space' },
    { trait_type: 'Style', value: 'Abstract' },
    { trait_type: 'Colors', value: 'Vibrant' },
  ],
};

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
}

export default function ItemDetails({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{nftData.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={nftData.image}
              alt={nftData.name}
              className="w-full rounded-lg cursor-pointer transition-transform duration-300"
            />
          </div>
          <div>
            <p className="text-xl font-semibold mb-4">{nftData.price} ETH</p>
            <p className="text-gray-600 mb-4">Creator: {nftData.creator}</p>
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="attributes">Attributes</TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <p>{nftData.description}</p>
              </TabsContent>
              <TabsContent value="attributes">
                <ul>
                  {nftData.attributes.map((attr, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold">{attr.trait_type}:</span> {attr.value}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/checkout" className="w-full">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}