import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Project Interface
export interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  discountPercentage: number;
  techStack: string[];
  domain: string;
  images: string[];
  videos: string[];
  featured: boolean;
  soldCount: number;
  features: string;
  support: string;
  createdAt: string;
  updatedAt: string;
}

export function TopProjects() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        const res = await axios.get("https://project-palace-paradise.onrender.com/api/projects");
        const sorted = res.data
          .sort((a: Project, b: Project) => b.soldCount - a.soldCount)
          .slice(0, 5);
        setProjects(sorted);
      } catch (error) {
        console.error("❌ Failed to fetch top projects:", error);
      }
    };
    fetchTopProjects();
  }, []);

  const handleViewDetails = (projectId: string) => {
    if (!isAuthenticated) {
      navigate("/loginuser");
    } else {
      navigate(`/project/${projectId}`);
    }
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  if (projects.length === 0) return null;

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
              <MainProjectCard
                project={projects[activeIndex]}
                onViewDetails={handleViewDetails}
              />
            </div>

            <div className="space-y-4">
              {projects
                .filter((_, index) => index !== activeIndex)
                .slice(0, 2)
                .map((project) => (
                  <SideProjectCard
                    key={project._id}
                    project={project}
                    onClick={() =>
                      setActiveIndex(projects.findIndex((p) => p._id === project._id))
                    }
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

function MainProjectCard({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (projectId: string) => void;
}) {
  const discountedPrice = project.discountPercentage
    ? project.price - (project.price * project.discountPercentage) / 100
    : null;

  const imageSrc = project.images?.[0] || "/placeholder.svg";

  return (
    <Card className="overflow-hidden h-full flex flex-col project-card">
      <div className="relative h-80">
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        {project.discountPercentage > 0 && (
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
            <span
              key={tech}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="font-bold">
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-xl"> ₹{discountedPrice.toFixed(2)}</span>
                <span className="text-muted-foreground line-through">
                  ₹{project.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-xl"> ₹{project.price.toFixed(2)}</span>
            )}
          </div>
          <Button onClick={() => onViewDetails(project._id)}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SideProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const discountedPrice = project.discountPercentage
    ? project.price - (project.price * project.discountPercentage) / 100
    : null;

  const imageSrc = project.images?.[0] || "/placeholder.svg";

  return (
    <Card
      className="overflow-hidden flex h-[180px] project-card cursor-pointer"
      onClick={onClick}
    >
      <div className="w-1/3">
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardContent className="w-2/3 p-4 flex flex-col">
        <h3 className="font-bold mb-1">{project.title}</h3>
        <div className="flex flex-wrap gap-1 mb-2">
          {project.techStack.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-xs"
            >
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
            {discountedPrice ? (
              <div className="flex items-center gap-1">
                <span> ₹{discountedPrice.toFixed(2)}</span>
                <span className="text-muted-foreground line-through text-xs">
                  ₹{project.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span> ₹{project.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
