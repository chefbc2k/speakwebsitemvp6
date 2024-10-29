'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Globe, LogIn, LogOut, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, isAdmin, login, logout, address } = useAuth();

  return (
    <nav className="bg-navy shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="text-xl font-bold text-yellow">
              NFT Marketplace
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="text-cream hover:text-yellow"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <Link href="/discover/trending-collections" className="text-base font-medium text-cream hover:text-yellow">
              Discover
            </Link>
            <Link href="/marketplace" className="text-base font-medium text-cream hover:text-yellow">
              Marketplace
            </Link>
            <Link href="/voice-capture" className="text-base font-medium text-cream hover:text-yellow flex items-center">
              <Mic className="h-4 w-4 mr-1" />
              Voice Collection
            </Link>
            <Link href="/community" className="text-base font-medium text-cream hover:text-yellow">
              Community
            </Link>
            {isLoggedIn && (
              <Link href="/profile" className="text-base font-medium text-cream hover:text-yellow">
                Profile
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-base font-medium text-cream hover:text-yellow">
                Admin
              </Link>
            )}
            <Button variant="ghost" size="icon" className="text-cream hover:text-yellow">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-cream hover:text-yellow">
              <Globe className="h-5 w-5" />
            </Button>
            {isLoggedIn ? (
              <Button onClick={logout} className="text-cream hover:text-yellow flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            ) : (
              <Button onClick={login} className="text-cream hover:text-yellow flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-navy divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Link href="/" className="text-xl font-bold text-yellow">
                    NFT Marketplace
                  </Link>
                </div>
                <div className="-mr-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="text-cream hover:text-yellow"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link href="/discover/trending-collections" className="text-base font-medium text-cream hover:text-yellow">
                    Discover
                  </Link>
                  <Link href="/marketplace" className="text-base font-medium text-cream hover:text-yellow">
                    Marketplace
                  </Link>
                  <Link href="/voice-capture" className="text-base font-medium text-cream hover:text-yellow flex items-center">
                    <Mic className="h-4 w-4 mr-1" />
                    Voice Collection
                  </Link>
                  <Link href="/community" className="text-base font-medium text-cream hover:text-yellow">
                    Community
                  </Link>
                  {isLoggedIn && (
                    <Link href="/profile" className="text-base font-medium text-cream hover:text-yellow">
                      Profile
                    </Link>
                  )}
                  {isAdmin && (
                    <Link href="/admin" className="text-base font-medium text-cream hover:text-yellow">
                      Admin
                    </Link>
                  )}
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" className="text-cream hover:text-yellow">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-cream hover:text-yellow">
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
              {isLoggedIn ? (
                <Button onClick={logout} className="w-full text-cream hover:text-yellow flex items-center justify-center">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button onClick={login} className="w-full text-cream hover:text-yellow flex items-center justify-center">
                  <LogIn className="h-5 w-5 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;