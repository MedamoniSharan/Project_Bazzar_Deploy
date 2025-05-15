import { useState, useEffect } from "react";
import axios from "axios";

import { Header } from "@/components/Header";
import { TopProjects } from "@/components/TopProjects";
import { ProjectFilter } from "@/components/ProjectFilter";
import { TechStackSlider } from "@/components/TechStackSlider";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";

// Project Type
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

const Index = () => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    techStack: [] as string[],
    domain: "all",
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  // Fetch all projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://project-palace-paradise.onrender.com/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("❌ Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = projects.filter((project) => {
      const matchesPrice =
        project.price >= filters.priceRange.min &&
        project.price <= filters.priceRange.max;

      const matchesTech =
        filters.techStack.length === 0 ||
        filters.techStack.some((tech) =>
          project.techStack.map((t) => t.toLowerCase()).includes(tech.toLowerCase())
        );

      const matchesDomain =
        filters.domain === "all" ||
        project.domain.toLowerCase() === filters.domain.toLowerCase();

      return matchesPrice && matchesTech && matchesDomain;
    });

    setFilteredProjects(filtered);
  }, [filters, projects]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-secondary/20 py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ready-to-Use Projects for Developers
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                High-quality, professionally built projects ready to deploy. Save time and accelerate your development.
              </p>
              <div className="discount-badge inline-block px-4 py-2 rounded-md text-lg font-semibold mb-8 bg-primary text-primary-foreground animate-pulse">
                STUDENT OFFER: 10% DISCOUNT with code 444555
              </div>
            </div>
          </div>
        </section>

        {/* Top Projects */}
        <TopProjects />

        {/* Filter and Project Grid */}
        <div className="container">
          <ProjectFilter onFilterChange={handleFilterChange} />

          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Projects ({filteredProjects.length})</h2>
            {filteredProjects.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/20 rounded-lg">
                <p className="text-lg text-muted-foreground">
                  No projects match your filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack and Contact */}
        <TechStackSlider />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
