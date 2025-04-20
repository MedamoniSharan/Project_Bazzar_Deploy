
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/data/projects";
import { FileCode2, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  const discountedPrice = project.discountPercentage 
    ? project.price - (project.price * project.discountPercentage / 100) 
    : null;

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300 bg-card">
        <div className="relative h-48">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {project.discountPercentage && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground font-semibold rounded-full px-3 py-1 text-sm shadow-lg">
              {project.discountPercentage}% OFF
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="font-bold text-white text-lg line-clamp-1">{project.title}</h3>
          </div>
        </div>
        <CardContent className="flex flex-col flex-grow p-4 space-y-4">
          <div className="flex items-start gap-2">
            <FileCode2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
            <p className="text-muted-foreground text-sm line-clamp-2">{project.shortDescription}</p>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                {discountedPrice ? (
                  <>
                    <span className="text-xl font-bold">${discountedPrice}</span>
                    <span className="text-sm text-muted-foreground line-through">${project.price}</span>
                  </>
                ) : (
                  <span className="text-xl font-bold">${project.price}</span>
                )}
              </div>
              <Tag className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
