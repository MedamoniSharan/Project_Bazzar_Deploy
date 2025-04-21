
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ProjectFilterProps {
  onFilterChange?: (filters: any) => void;
}

export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [techStack, setTechStack] = useState<string[]>([]);
  const [domain, setDomain] = useState("all");

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    setPriceRange(prev => {
      const newRange = { ...prev, [type]: numValue };
      if (onFilterChange) {
        onFilterChange({ priceRange: newRange, techStack, domain });
      }
      return newRange;
    });
  };

  const handleTechStackChange = (tech: string) => {
    setTechStack(prev => {
      const isSelected = prev.includes(tech);
      const newTechStack = isSelected 
        ? prev.filter(t => t !== tech)
        : [...prev, tech];
      
      if (onFilterChange) {
        onFilterChange({ priceRange, techStack: newTechStack, domain });
      }
      return newTechStack;
    });
  };

  const handleDomainChange = (value: string) => {
    setDomain(value);
    if (onFilterChange) {
      onFilterChange({ priceRange, techStack, domain: value });
    }
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange({ priceRange, techStack, domain });
    }
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {techStack.length > 0 
                    ? `${techStack.length} selected` 
                    : "Select technologies"}
                  <span className="ml-2">▼</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {["React", "Vue", "Angular", "Node.js", "Python"].map((tech) => (
                  <DropdownMenuCheckboxItem
                    key={tech}
                    checked={techStack.includes(tech.toLowerCase())}
                    onCheckedChange={() => handleTechStackChange(tech.toLowerCase())}
                  >
                    {tech}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Domain</label>
            <Select
              value={domain}
              onValueChange={handleDomainChange}
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
        
        <div className="mt-6">
          <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}
