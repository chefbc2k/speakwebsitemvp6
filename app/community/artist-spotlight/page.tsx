'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

const AudioVisualizer = () => {
  const [audioData, setAudioData] = useState<number[]>(new Array(128).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setAudioData(new Array(128).fill(0).map(() => Math.random() * 255));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-center h-24 bg-gray-100 rounded-lg overflow-hidden">
      {audioData.map((value, index) => (
        <div
          key={index}
          className="w-1 mx-px bg-blue-500"
          style={{ height: `${value / 255 * 100}%` }}
        ></div>
      ))}
    </div>
  );
};

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="flex justify-center space-x-4">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="text-center">
          <div className="text-4xl font-bold">{value}</div>
          <div className="text-sm uppercase">{interval}</div>
        </div>
      ))}
    </div>
  );
};

export default function SoundWaveShowcase() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">SoundWave Showcase</h1>
        <p className="text-xl mb-2">Audio NFT Launch Event</p>
        <p className="text-lg">July 15, 2023 | Virtual Event</p>
      </section>

      {/* Event Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Event Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Join us for a groundbreaking event celebrating the intersection of music and blockchain technology. The SoundWave Showcase introduces a new era of audio NFTs, where artists can tokenize their unique sounds and fans can own a piece of music history.</p>
        </CardContent>
      </Card>

      {/* Featured Artists */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Artists</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['DJ Crypto', 'Blockchain Beats', 'NFT Harmony'].map((artist, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{artist}</CardTitle>
              </CardHeader>
              <CardContent>
                <AudioVisualizer />
                <p className="mt-4">Experience the unique sound of {artist}, pioneering the audio NFT space.</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Event Schedule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Event Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>10:00 AM - Opening Ceremony</li>
            <li>11:00 AM - Keynote: The Future of Audio NFTs</li>
            <li>1:00 PM - Artist Showcase</li>
            <li>3:00 PM - Panel Discussion: Collecting Sound</li>
            <li>5:00 PM - NFT Drop</li>
          </ul>
        </CardContent>
      </Card>

      {/* Countdown Timer */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>NFT Drop Countdown</CardTitle>
        </CardHeader>
        <CardContent>
          <CountdownTimer targetDate="2023-07-15T17:00:00" />
        </CardContent>
      </Card>

      {/* Registration/Wallet Connection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Join the Event</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Connect your wallet to register for the event and participate in the NFT drop.</p>
          <Button>Connect Wallet</Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What are audio NFTs?</AccordionTrigger>
              <AccordionContent>
                Audio NFTs are unique digital assets that represent ownership of a specific audio file or musical piece on the blockchain.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I participate in the NFT drop?</AccordionTrigger>
              <AccordionContent>
                To participate, you'll need to connect your crypto wallet and be ready at the time of the drop. Make sure you have enough ETH to cover the purchase and gas fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I resell my audio NFT?</AccordionTrigger>
              <AccordionContent>
                Yes, you can resell your audio NFT on supported marketplaces. Each resale may include a royalty payment to the original artist.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="text-center mt-12">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="#" aria-label="Facebook">
            <Facebook className="text-gray-600 hover:text-gray-900" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="text-gray-600 hover:text-gray-900" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="text-gray-600 hover:text-gray-900" />
          </Link>
          <Link href="#" aria-label="YouTube">
            <Youtube className="text-gray-600 hover:text-gray-900" />
          </Link>
        </div>
        <p>&copy; 2023 SoundWave Showcase. All rights reserved.</p>
      </footer>
    </div>
  );
}