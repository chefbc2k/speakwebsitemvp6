'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { withAuth } from '@/components/withAuth';
import { useAuth } from '@/contexts/AuthContext';

const PersonalInformation = () => {
  const [username, setUsername] = useState('JohnDoe');
  const [email, setEmail] = useState('john@example.com');
  const [allowNFTSales, setAllowNFTSales] = useState(true);
  const [showNFTCollection, setShowNFTCollection] = useState(true);
  const { address } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Button>Change Picture</Button>
      </div>

      <div className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="wallet-address">Wallet Address</Label>
          <Input
            type="text"
            id="wallet-address"
            value={address}
            readOnly
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">NFT Settings</h3>
        <div className="flex items-center space-x-2">
          <Switch
            id="allow-nft-sales"
            checked={allowNFTSales}
            onCheckedChange={setAllowNFTSales}
          />
          <Label htmlFor="allow-nft-sales">Allow NFT Sales</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-nft-collection"
            checked={showNFTCollection}
            onCheckedChange={setShowNFTCollection}
          />
          <Label htmlFor="show-nft-collection">Show NFT Collection</Label>
        </div>
      </div>

      <Button>Save Changes</Button>
    </div>
  );
};

export default withAuth(PersonalInformation);