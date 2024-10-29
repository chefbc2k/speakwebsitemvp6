import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="personal" asChild>
            <Link href="/profile">Personal Information</Link>
          </TabsTrigger>
          <TabsTrigger value="collection" asChild>
            <Link href="/profile/collection">NFT Collection</Link>
          </TabsTrigger>
          <TabsTrigger value="transactions" asChild>
            <Link href="/profile/transactions">Transaction History</Link>
          </TabsTrigger>
          <TabsTrigger value="create-nft" asChild>
            <Link href="/profile/create-nft">Create NFT</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </div>
  );
}