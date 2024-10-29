import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              NFT Marketplace is a leading platform for buying, selling, and discovering unique digital assets.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/marketplace" className="text-sm text-gray-600 hover:text-gray-900">Marketplace</Link></li>
              <li><Link href="/community" className="text-sm text-gray-600 hover:text-gray-900">Community</Link></li>
              <li><Link href="/profile" className="text-sm text-gray-600 hover:text-gray-900">Profile</Link></li>
              <li><Link href="/admin" className="text-sm text-gray-600 hover:text-gray-900">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900"><Facebook /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><Instagram /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">&copy; 2023 NFT Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;