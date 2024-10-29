import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trendingCollections = [
  { id: 1, name: "Bored Ape Yacht Club", image: "https://picsum.photos/seed/bored-ape/300/300", floorPrice: 50 },
  { id: 2, name: "CryptoPunks", image: "https://picsum.photos/seed/cryptopunks/300/300", floorPrice: 30 },
  { id: 3, name: "Azuki", image: "https://picsum.photos/seed/azuki/300/300", floorPrice: 15 },
  { id: 4, name: "Doodles", image: "https://picsum.photos/seed/doodles/300/300", floorPrice: 8 },
  { id: 5, name: "Art Blocks", image: "https://picsum.photos/seed/art-blocks/300/300", floorPrice: 5 },
];

export default function TrendingCollections() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trending Collections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingCollections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={collection.image} alt={collection.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="font-semibold">Floor Price: {collection.floorPrice} ETH</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}