
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTopProjects, Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function TopProjects() {
  const projects = getTopProjects(5);
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Top Selling Projects</h2>
        
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <MainProjectCard project={projects[activeIndex]} />
            </div>
            
            <div className="space-y-4">
              {projects
                .filter((_, index) => index !== activeIndex)
                .slice(0, 2)
                .map((project) => (
                  <SideProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => setActiveIndex(projects.findIndex(p => p.id === project.id))}
                  />
                ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function MainProjectCard({ project }: { project: Project }) {
  const discountedPrice = project.discountPercentage 
    ? project.price - (project.price * project.discountPercentage / 100) 
    : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col project-card">
      <div className="relative h-80">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.discountPercentage && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground font-semibold rounded-full px-3 py-1">
            {project.discountPercentage}% OFF
          </div>
        )}
      </div>
      <CardContent className="flex flex-col flex-grow p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold">
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl">${discountedPrice}</span>
                <span className="text-muted-foreground line-through">${project.price}</span>
              </div>
            ) : (
              <span className="text-xl">${project.price}</span>
            )}
          </div>
          <Link to={`/project/${project.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function SideProjectCard({ 
  project, 
  onClick 
}: { 
  project: Project; 
  onClick: () => void;
}) {
  return (
    <Card className="overflow-hidden flex h-[180px] project-card cursor-pointer" onClick={onClick}>
      <div className="w-1/3">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="w-2/3 p-4 flex flex-col">
        <h3 className="font-bold mb-1">{project.title}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.techStack.slice(0, 2).map((tech) => (
            <span key={tech} className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs">
              {tech}
            </span>
          ))}
          {project.techStack.length > 2 && (
            <span className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs">
              +{project.techStack.length - 2}
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">{project.shortDescription}</p>
        <div className="mt-auto">
          <div className="font-bold">
            {project.discountPercentage ? (
              <div className="flex items-center gap-1">
                <span>${project.price - (project.price * project.discountPercentage / 100)}</span>
                <span className="text-muted-foreground line-through text-xs">${project.price}</span>
              </div>
            ) : (
              <span>${project.price}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
