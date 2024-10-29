'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Music2, Users, Zap, ArrowRight, Mic } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    title: "Music for NFT Creators",
    description: "Turn your voice into unique digital assets",
    icon: Mic,
    link: "/voice-capture",
    color: "bg-yellow"
  },
  {
    title: "Digital Music for Fans",
    description: "Collect and trade unique voice NFTs",
    icon: Music2,
    link: "/marketplace",
    color: "bg-orange"
  },
  {
    title: "Community Features",
    description: "Connect with artists and collectors",
    icon: Users,
    link: "/community",
    color: "bg-yellow"
  },
  {
    title: "Powered by Blockchain",
    description: "Secure, transparent, and decentralized",
    icon: Zap,
    link: "/discover",
    color: "bg-orange"
  }
];

export default function NavigationSection() {
  return (
    <section className="relative min-h-screen bg-navy/90 py-20 snap-start section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-cream mb-6">Explore Our Platform</h2>
          <p className="text-xl text-orange max-w-2xl mx-auto">
            Discover all the ways you can create, collect, and trade voice NFTs in our ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={section.link}>
                <div className="group relative overflow-hidden rounded-lg bg-gray-900/50 p-6 hover:bg-gray-900/70 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`${section.color} p-3 rounded-full mr-4`}>
                      <section.icon className="h-6 w-6 text-navy" />
                    </div>
                    <h3 className="text-xl font-bold text-cream">{section.title}</h3>
                  </div>
                  <p className="text-orange mb-4">{section.description}</p>
                  <div className="flex items-center text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link href="/discover">
            <Button
              variant="outline"
              size="lg"
              className="text-cream border-cream hover:bg-cream hover:text-navy"
            >
              Discover More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}