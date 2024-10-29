'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [voiceCharacteristics, setVoiceCharacteristics] = useState<string[]>([]);

  const regions = [
    "North America",
    "Europe",
    "Asia",
    "South America",
    "Africa",
    "Oceania"
  ];

  const voiceTypes = [
    "Bass",
    "Baritone",
    "Tenor",
    "Alto",
    "Soprano",
    "Neutral"
  ];

  const handleSearch = () => {
    onFilterChange({
      searchTerm,
      priceRange,
      regions: selectedRegions,
      voiceCharacteristics
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="flex space-x-2">
          <Input
            id="search"
            placeholder="Search NFTs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range (ETH)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                min={0}
                max={10}
                step={0.1}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm">
                <span>{priceRange[0]} ETH</span>
                <span>{priceRange[1]} ETH</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="region">
          <AccordionTrigger>Region</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {regions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={region}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRegions([...selectedRegions, region]);
                      } else {
                        setSelectedRegions(selectedRegions.filter(r => r !== region));
                      }
                    }}
                  />
                  <Label htmlFor={region}>{region}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="voice">
          <AccordionTrigger>Voice Characteristics</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {voiceTypes.map((voice) => (
                <div key={voice} className="flex items-center space-x-2">
                  <Checkbox
                    id={voice}
                    checked={voiceCharacteristics.includes(voice)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setVoiceCharacteristics([...voiceCharacteristics, voice]);
                      } else {
                        setVoiceCharacteristics(voiceCharacteristics.filter(v => v !== voice));
                      }
                    }}
                  />
                  <Label htmlFor={voice}>{voice}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="advanced">
          <AccordionTrigger>Advanced Filters</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Rarity</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (0-30s)</SelectItem>
                    <SelectItem value="medium">Medium (30s-2m)</SelectItem>
                    <SelectItem value="long">Long (2m+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}