import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>NFT Artist Meetup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Date:</strong> June 15, 2023</p>
            <p className="mb-2"><strong>Time:</strong> 7:00 PM - 9:00 PM EST</p>
            <p className="mb-2"><strong>Location:</strong> Virtual (Zoom)</p>
            <p>Join us for an evening of networking and inspiration with fellow NFT artists. Share your work, get feedback, and learn from others in the community.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Blockchain and NFT Workshop</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2"><strong>Date:</strong> July 1, 2023</p>
            <p className="mb-2"><strong>Time:</strong> 2:00 PM - 5:00 PM EST</p>
            <p className="mb-2"><strong>Location:</strong> Tech Hub, 123 Main St, Anytown, USA</p>
            <p>Learn the fundamentals of blockchain technology and how it relates to NFTs in this hands-on workshop. Perfect for beginners and intermediate enthusiasts.</p>
          </CardContent>
        </Card>
        {/* Add more events as needed */}
      </div>
    </div>
  );
}