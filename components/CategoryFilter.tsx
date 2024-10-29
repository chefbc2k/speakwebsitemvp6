'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  subcategories?: string[];
}

interface CategoryFilterProps {
  onFilterChange: (category: string, subcategory: string | null) => void;
}

const categories: Category[] = [
  {
    name: "Entertainment & Media",
    subcategories: ["Animation", "Film/TV", "Radio", "Games", "Audiobooks"]
  },
  {
    name: "Advertising & Marketing",
    subcategories: ["TV Commercials", "Online Ads", "Corporate Presentations"]
  },
  {
    name: "E-learning & Education",
    subcategories: ["Online Courses", "Training Videos", "Educational Apps"]
  },
  {
    name: "Technology & Telecom",
    subcategories: ["IVR Systems", "Virtual Assistants", "Text-to-Speech"]
  },
  {
    name: "Corporate & Business",
    subcategories: ["Training Videos", "Internal Communications", "Brand Messaging"]
  },
  {
    name: "Healthcare",
    subcategories: ["Medical E-learning", "Telemedicine"]
  },
  {
    name: "Government Services",
    subcategories: ["PSAs", "Training Materials", "Information Systems"]
  },
  {
    name: "Transportation",
    subcategories: ["Transit Announcements", "Navigation Systems"]
  },
  {
    name: "Hospitality & Tourism",
    subcategories: ["Guided Tours", "Travel Ads"]
  },
  {
    name: "Retail",
    subcategories: ["Store Announcements", "E-commerce"]
  },
  {
    name: "Religious Content",
    subcategories: ["Religious Media", "Audio Bibles"]
  },
  {
    name: "Real Estate",
    subcategories: ["Virtual Tours"]
  },
  {
    name: "Event Hosting",
    subcategories: ["Voice of God", "Event Marketing"]
  },
  {
    name: "Podcasts",
    subcategories: ["Narration", "Educational"]
  },
  {
    name: "Legal",
    subcategories: ["Court Transcripts", "Legal Reviews"]
  },
  {
    name: "Finance",
    subcategories: ["Financial Training", "Investor Presentations"]
  },
  {
    name: "Contract Types",
    subcategories: ["Royalty", "Movie", "Music", "Podcast"]
  },
  {
    name: "Pricing Models",
    subcategories: [
      "Getty Images",
      "AP News",
      "SoundCloud",
      "NPR",
      "Dynamic Pricing",
      "Banking CD",
      "Mexican Sharing",
      "Micro Loan"
    ]
  }
];

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    onFilterChange(category, null);
  };

  const handleSubcategoryClick = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    onFilterChange(category, subcategory);
  };

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-2 p-2">
        {categories.map((category) => (
          <div key={category.name} className="space-y-1">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 mr-1"
                onClick={() => toggleCategory(category.name)}
              >
                {expandedCategories.includes(category.name) 
                  ? <ChevronDown className="h-4 w-4" />
                  : <ChevronRight className="h-4 w-4" />
                }
              </Button>
              <Button
                variant={selectedCategory === category.name && !selectedSubcategory ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleCategoryClick(category.name)}
              >
                {category.name}
              </Button>
            </div>
            
            {expandedCategories.includes(category.name) && category.subcategories && (
              <div className="ml-6 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <Button
                    key={subcategory}
                    variant={selectedSubcategory === subcategory ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleSubcategoryClick(category.name, subcategory)}
                  >
                    {subcategory}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}