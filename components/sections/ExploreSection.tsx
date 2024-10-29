'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, ShoppingBag, Mic, Users, User } from 'lucide-react';
import Link from 'next/link';

const exploreItems = [
  {
    title: "Discovery",
    description: "Explore trending voice NFTs and popular creators",
    icon: Compass,
    link: "/discover",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80"
  },
  {
    title: "Marketplace",
    description: "Buy and sell unique voice NFTs",
    icon: ShoppingBag,
    link: "/marketplace",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80"
  },
  {
    title: "Voice Collection",
    description: "Record and mint your voice as NFTs",
    icon: Mic,
    link: "/voice-capture",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80"
  },
  {
    title: "Community",
    description: "Connect with other voice artists and collectors",
    icon: Users,
    link: "/community",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80"
  },
  {
    title: "Profile",
    description: "Manage your NFTs and account",
    icon: User,
    link: "/profile",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
  }
];

export default function ExploreSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-navy/80 to-orange/80 snap-start section">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-cream mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-cream">
              Join our community of voice artists and collectors. Start creating and trading unique voice NFTs today.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.link}>
                  <div className="group relative overflow-hidden rounded-lg h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-navy/60 transition-opacity duration-300 group-hover:opacity-75" />
                    <div className="relative h-full p-6 flex flex-col justify-end">
                      <div className="flex items-center mb-2">
                        <item.icon className="h-6 w-6 text-yellow mr-2" />
                        <h3 className="text-xl font-bold text-cream">{item.title}</h3>
                      </div>
                      <p className="text-orange mb-4">{item.description}</p>
                      <Button
                        variant="outline"
                        className="text-cream border-cream hover:bg-cream hover:text-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}