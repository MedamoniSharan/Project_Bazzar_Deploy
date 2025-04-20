
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getDomains, getTechStacks, Project, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProjectFilter() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedTechStacks, setSelectedTechStacks] = useState<string[]>([]);
  const [domain, setDomain] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  
  const techStacks = getTechStacks();
  const domains = getDomains();
  
  const minPrice = 0;
  const maxPrice = 2000;
  
  const handleTechStackChange = (tech: string) => {
    setSelectedTechStacks(prev => {
      if (prev.includes(tech)) {
        return prev.filter(t => t !== tech);
      }
      return [...prev, tech];
    });
  };
  
  useEffect(() => {
    let result = [...projects];
    
    if (selectedTechStacks.length > 0) {
      result = result.filter(project => 
        selectedTechStacks.some(tech => project.techStack.includes(tech))
      );
    }
    
    if (domain && domain !== "all") {
      result = result.filter(project => 
        project.domain === domain
      );
    }
    
    result = result.filter(project => 
      project.price >= priceRange[0] && project.price <= priceRange[1]
    );
    
    setFilteredProjects(result);
  }, [selectedTechStacks, domain, priceRange]);
  
  const resetFilters = () => {
    setSelectedTechStacks([]);
    setDomain("all");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Tag className="h-8 w-8" />
          Browse Projects
        </h2>
        
        <div className="mb-8 rounded-xl bg-card shadow-lg p-6 space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold">Tech Stack</Label>
            <div className="flex flex-wrap gap-2">
              {techStacks.map(tech => (
                <Badge
                  key={tech}
                  variant={selectedTechStacks.includes(tech) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={() => handleTechStackChange(tech)}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="domain" className="text-lg font-semibold">Domain</Label>
            <Select value={domain} onValueChange={setDomain}>
              <SelectTrigger id="domain" className="w-full md:w-72">
                <SelectValue placeholder="All Domains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {domains.map(domain => (
                  <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="price-range" className="text-lg font-semibold">Price Range</Label>
              <span className="text-sm bg-secondary px-3 py-1 rounded-full">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              id="price-range"
              min={minPrice}
              max={maxPrice}
              step={50}
              value={priceRange}
              onValueChange={setPriceRange}
              className="py-4"
            />
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-2">No projects match your filters</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </section>
  );
}
