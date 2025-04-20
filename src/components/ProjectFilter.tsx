
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getDomains, getTechStacks, Project, projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [techStack, setTechStack] = useState<string>("all");
  const [domain, setDomain] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  
  const techStacks = getTechStacks();
  const domains = getDomains();
  
  const minPrice = 0;
  const maxPrice = 2000;
  
  useEffect(() => {
    let result = [...projects];
    
    if (techStack && techStack !== "all") {
      result = result.filter(project => 
        project.techStack.includes(techStack)
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
  }, [techStack, domain, priceRange]);
  
  const resetFilters = () => {
    setTechStack("all");
    setDomain("all");
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Browse Projects</h2>
        
        <div className="mb-8 grid gap-6 md:grid-cols-3 lg:grid-cols-4 bg-secondary/50 p-6 rounded-lg">
          <div className="space-y-2">
            <Label htmlFor="tech-stack">Tech Stack</Label>
            <Select value={techStack} onValueChange={setTechStack}>
              <SelectTrigger id="tech-stack">
                <SelectValue placeholder="All Technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technologies</SelectItem>
                {techStacks.map(tech => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="domain">Domain</Label>
            <Select value={domain} onValueChange={setDomain}>
              <SelectTrigger id="domain">
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
          
          <div className="space-y-2 md:col-span-2">
            <div className="flex justify-between">
              <Label htmlFor="price-range">Price Range</Label>
              <span className="text-sm text-muted-foreground">
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
          
          <div className="md:col-span-3 lg:col-span-4 flex justify-end">
            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No projects match your filters</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filter criteria</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </section>
  );
}
