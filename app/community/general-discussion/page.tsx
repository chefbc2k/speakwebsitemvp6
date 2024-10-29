import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneralDiscussion() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">General Discussion</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to the General Discussion Forum</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a place for open conversations about NFTs, digital art, and the crypto world. Share your thoughts, ask questions, and connect with fellow enthusiasts.</p>
          </CardContent>
        </Card>
        {/* Add more content or integrate a forum component here */}
      </div>
    </div>
  );
}