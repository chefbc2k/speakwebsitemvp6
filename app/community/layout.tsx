import Link from 'next/link';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      <div className="flex mb-4">
        <Link href="/community" className="mr-4">Forums</Link>
        <Link href="/community/events" className="mr-4">Events</Link>
        <Link href="/community/artists" className="mr-4">Artist Spotlight</Link>
      </div>
      {children}
    </div>
  );
}