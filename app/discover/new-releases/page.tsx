import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newReleases = [
  { id: 1, name: "Celestial Odyssey", artist: "StarGazer", image: "https://picsum.photos/seed/celestial/300/300", price: 0.5 },
  { id: 2, name: "Neon Dreams", artist: "CyberArtist", image: "https://picsum.photos/seed/neon/300/300", price: 0.3 },
  { id: 3, name: "Quantum Realms", artist: "QuantumCreator", image: "https://picsum.photos/seed/quantum/300/300", price: 0.7 },
  { id: 4, name: "Digital Fauna", artist: "PixelNaturalist", image: "https://picsum.photos/seed/fauna/300/300", price: 0.4 },
  { id: 5, name: "Abstract Emotions", artist: "EmotiveArtist", image: "https://picsum.photos/seed/abstract/300/300", price: 0.6 },
];

export default function NewReleases() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">New Releases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newReleases.map((release) => (
          <Card key={release.id}>
            <CardHeader>
              <CardTitle>{release.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={release.image} alt={release.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <p className="font-semibold">Artist: {release.artist}</p>
              <p>Price: {release.price} ETH</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}