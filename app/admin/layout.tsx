import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4">
          <Link href="/admin" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Dashboard</Link>
          <Link href="/admin/users" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Users</Link>
          <Link href="/admin/nfts" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">NFT Listings</Link>
          <Link href="/admin/transactions" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Transactions</Link>
          <Link href="/admin/analytics" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Analytics</Link>
          <Link href="/admin/settings" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">Settings</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Input type="text" placeholder="Search..." className="mr-2" />
              <Button size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="icon" variant="ghost">
                <Bell className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}