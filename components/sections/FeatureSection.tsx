'use client';

import { motion } from 'framer-motion';
import { Mic, Music2, Wallet } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Mic,
    title: "Record",
    description: "Create professional-grade voice recordings with our state-of-the-art tools.",
    link: "/voice-capture",
    image: "https://images.unsplash.com/photo-1520692852662-6be74c2d1ab4?auto=format&fit=crop&q=80",
    color: "bg-yellow"
  },
  {
    icon: Music2,
    title: "Mint",
    description: "Transform your voice recordings into unique NFTs on the blockchain.",
    link: "/profile/create-nft",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80",
    color: "bg-orange"
  },
  {
    icon: Wallet,
    title: "Trade",
    description: "Buy, sell, and collect voice NFTs in our secure marketplace.",
    link: "/marketplace",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&q=80",
    color: "bg-yellow"
  }
];

export default function FeatureSection() {
  return (
    <section className="relative min-h-screen bg-navy/80 snap-start section">
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-cream text-center mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link href={feature.link} key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/60 transition-opacity duration-300 group-hover:opacity-75" />
                </div>
                <div className="relative p-6 h-full flex flex-col items-center text-center">
                  <div className={`${feature.color} text-navy rounded-full w-16 h-16 flex items-center justify-center mb-4`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-cream mb-2">{feature.title}</h3>
                  <p className="text-orange">{feature.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}