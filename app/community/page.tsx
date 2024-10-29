import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CommunityHome() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Community Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Engage in conversations about NFTs, digital art, and the crypto world.</p>
            <Link href="/community/general-discussion" className="text-blue-500 hover:underline mt-2 inline-block">
              Join the discussion
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Artist Showcase</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Discover and appreciate amazing NFT artworks from talented creators.</p>
            <Link href="/community/artist-showcase" className="text-blue-500 hover:underline mt-2 inline-block">
              Explore artworks
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trading Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Share and learn strategies for successful NFT trading.</p>
            <Link href="/community/trading-tips" className="text-blue-500 hover:underline mt-2 inline-block">
              Get trading insights
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Stay updated on upcoming community gatherings and workshops.</p>
            <Link href="/community/events" className="text-blue-500 hover:underline mt-2 inline-block">
              View events calendar
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Artist Spotlight</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Featured artists and their inspiring work in the NFT space.</p>
            <Link href="/community/artist-spotlight" className="text-blue-500 hover:underline mt-2 inline-block">
              Meet the artists
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}