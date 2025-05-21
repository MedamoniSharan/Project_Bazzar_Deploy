import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { FileCode2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/pages"; // Adjust path as needed
import { useAuth } from "@/context/AuthContext";
import "../../src/context/styles/star-twinkle.css"; // Custom animation class (see below)
import axios from "axios";

type ExtendedProject = Project & {
  favourite?: boolean;
};
export function ProjectCard({ project, isFavourite }: { project: Project; isFavourite?: boolean }) {
  const navigate = useNavigate();
  const { isAuthenticated , user} = useAuth();
  const [isFav, setIsFav] = useState(isFavourite || false);
  const [twinkle, setTwinkle] = useState(false);

  const imageSrc = project.images?.[0] || "/placeholder.svg";

  const discountedPrice =
    project.discountPercentage > 0
      ? project.price - (project.price * project.discountPercentage) / 100
      : null;

  const handleCardClick = () => {
    if (!isAuthenticated) {
      navigate("/loginuser");
    } else {
      navigate(`/project/${project._id}`);
    }
  };

  const toggleFavourite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user?.email) return;
  
    try {
      const res = await axios.post("https://project-palace-paradise.onrender.com/api/wishlist/toggle", {
        email: user.email,
        projectId: project._id,
      });
  
      setIsFav(res.data.status === "added");
      setTwinkle(true);
      setTimeout(() => setTwinkle(false), 500);
    } catch (error) {
      console.error("Toggle wishlist failed", error);
    }
  };
  

  return (
    <div onClick={handleCardClick} className="cursor-pointer">
      <Card className="overflow-hidden h-full group hover:shadow-xl transition-all duration-300 bg-card">
        <div className="relative h-48">
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          {project.discountPercentage > 0 && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground font-semibold rounded-full px-3 py-1 text-sm shadow-lg">
              {project.discountPercentage}% OFF
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="font-bold text-white text-lg line-clamp-1">
              {project.title}
            </h3>
          </div>
        </div>

        <CardContent className="flex flex-col flex-grow p-4 space-y-4">
          <div className="flex items-start gap-2">
            <FileCode2 className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-1" />
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project.shortDescription}
            </p>
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
                    <span className="text-xl font-bold">
                      ₹{discountedPrice.toFixed(0)}
                    </span>
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{project.price}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold">₹{project.price}</span>
                )}
              </div>

              {/* ⭐ Favourite Toggle */}
              <button
                onClick={toggleFavourite}
                className={`transition transform ${twinkle ? "twinkle" : ""}`}
                title="Add to Favourites"
              >
                <Star
                  className={`h-5 w-5 ${
                    isFav ? "fill-yellow-400 text-yellow-400" : "text-black"
                  }`}
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}