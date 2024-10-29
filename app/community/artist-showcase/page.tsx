import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArtistShowcase() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Artist Showcase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example showcase items */}
        <Card>
          <CardHeader>
            <CardTitle>Cosmic Dreams by Artist1</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="https://picsum.photos/seed/1/300/200" alt="Cosmic Dreams" className="w-full h-48 object-cover rounded-md mb-4" />
            <p>A mesmerizing journey through space and time.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Digital Landscapes by Artist2</CardTitle>
          </CardHeader>
          <CardContent>
            <img src="https://picsum.photos/seed/2/300/200" alt="Digital Landscapes" className="w-full h-48 object-cover rounded-md mb-4" />
            <p>Surreal digital environments that challenge perception.</p>
          </CardContent>
        </Card>
        {/* Add more showcase items as needed */}
      </div>
    </div>
  );
}