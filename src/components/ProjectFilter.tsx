
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectFilter({ onFilterChange }: { onFilterChange: (filters: any) => void }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [techStack, setTechStack] = useState<string[]>([]);
  const [domain, setDomain] = useState("all");

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setPriceRange(prev => {
      const newRange = { ...prev, [type]: numValue };
      onFilterChange({ priceRange: newRange, techStack, domain });
      return newRange;
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                min="0"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className="w-24"
              />
              <span>to</span>
              <Input
                type="number"
                min="0"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className="w-24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tech Stack</label>
            <Select
              value={techStack.join(",")}
              onValueChange={(value) => {
                const newTechStack = value.split(",").filter(Boolean);
                setTechStack(newTechStack);
                onFilterChange({ priceRange, techStack: newTechStack, domain });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
                <SelectItem value="node">Node.js</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Domain</label>
            <Select
              value={domain}
              onValueChange={(value) => {
                setDomain(value);
                onFilterChange({ priceRange, techStack, domain: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="web">Web Development</SelectItem>
                <SelectItem value="mobile">Mobile Development</SelectItem>
                <SelectItem value="desktop">Desktop Applications</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
