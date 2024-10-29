import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const topArtists = [
  { id: 1, name: "PixelMaster", image: "https://picsum.photos/seed/pixelmaster/300/300", totalSales: 1000 },
  { id: 2, name: "CryptoCreator", image: "https://picsum.photos/seed/cryptocreator/300/300", totalSales: 850 },
  { id: 3, name: "DigitalDreamer", image: "https://picsum.photos/seed/digitaldreamer/300/300", totalSales: 720 },
  { id: 4, name: "NFTNinja", image: "https://picsum.photos/seed/nftninja/300/300", totalSales: 650 },
  { id: 5, name: "BlockchainBrush", image: "https://picsum.photos/seed/blockchainbrush/300/300", totalSales: 580 },
];

export default function TopArtists() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topArtists.map((artist) => (
          <Card key={artist.id}>
            <CardHeader>
              <CardTitle>{artist.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={artist.image} alt={artist.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="font-semibold">Total Sales: {artist.totalSales} ETH</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}