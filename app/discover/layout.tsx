import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Discover NFTs</h1>
        <Tabs defaultValue="music" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="music" asChild>
              <Link href="/discover">Music NFTs</Link>
            </TabsTrigger>
            <TabsTrigger value="trending" asChild>
              <Link href="/discover/trending-collections">Trending Collections</Link>
            </TabsTrigger>
            <TabsTrigger value="new-releases" asChild>
              <Link href="/discover/new-releases">New Releases</Link>
            </TabsTrigger>
            <TabsTrigger value="top-artists" asChild>
              <Link href="/discover/top-artists">Top Artists</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {children}
      </div>
    </div>
  );
}