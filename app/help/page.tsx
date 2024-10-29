import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';

export default function HelpCenter() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Help Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Creating an account</li>
              <li>Setting up your wallet</li>
              <li>Browsing NFTs</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Buying NFTs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>How to purchase an NFT</li>
              <li>Understanding gas fees</li>
              <li>Transferring NFTs</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Selling NFTs</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Creating and minting NFTs</li>
              <li>Setting prices</li>
              <li>Managing your listings</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Can't find what you're looking for?</h2>
        <p>Check our <Link href="/faq" className="text-blue-500 hover:underline">FAQ</Link> or <Link href="/contact" className="text-blue-500 hover:underline">contact us</Link> for further assistance.</p>
      </div>
    </div>
  );
}