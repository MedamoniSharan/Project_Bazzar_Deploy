
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  const discountedPrice = project.discountPercentage 
    ? project.price - (project.price * project.discountPercentage / 100) 
    : null;

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="overflow-hidden h-full flex flex-col project-card">
        <div className="relative h-48">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {project.discountPercentage && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground font-semibold rounded-full px-2 py-0.5 text-sm">
              {project.discountPercentage}% OFF
            </div>
          )}
        </div>
        <CardContent className="flex flex-col flex-grow p-4">
          <h3 className="font-bold mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.shortDescription}</p>
          <div className="mt-auto font-bold">
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg">${discountedPrice}</span>
                <span className="text-muted-foreground line-through">${project.price}</span>
              </div>
            ) : (
              <span className="text-lg">${project.price}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
