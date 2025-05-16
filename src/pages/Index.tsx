import { useState, useEffect } from "react";
import axios from "axios";
import { TypeAnimation } from "react-type-animation";

import { Header } from "@/components/Header";
import { TopProjects } from "@/components/TopProjects";
import { ProjectFilter } from "@/components/ProjectFilter";
import { TechStackSlider } from "@/components/TechStackSlider";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import StatsSection from "./StatsSection";
import Lottie from "lottie-react";
import businessTeam from "./business-team.json"; // adjust path accordingly


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
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-4">
        
        {/* Left: Text Content */}
        <div className="text-center md:text-left max-w-xl flex-1 space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text animate-slide-in-up">
            Ready-to-Use Projects <br className="hidden md:block" /> for&nbsp;
            <TypeAnimation
              sequence={[
                "Developers",
                1500,
                "Non-Developers",
                1500,
                "Semi-Developers",
                1500,
                "Teams",
                1500,
                "Startups",
                1500,
                "Freelancers",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="inline-block text-primary"
            />
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground animate-fade-in-up delay-200">
            <span className="text-primary font-medium">High-quality</span>, production-ready templates built for speed.
            <br />
            Boost your launch and <span className="text-primary font-medium">save valuable time</span>.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-4 animate-fade-in-up delay-300">
            <button className="px-6 py-3 rounded-2xl font-semibold bg-primary text-white hover:bg-primary/90 transition flex items-center gap-2 shadow-lg">
              🚀 Get Started
            </button>
            <button className="px-6 py-3 rounded-2xl font-semibold border border-primary text-primary hover:bg-primary/10 transition flex items-center gap-2">
              📂 Browse Projects
            </button>
          </div>
        </div>

        {/* Right: Lottie Animation */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie
            animationData={businessTeam}
            loop
            className="w-full max-w-[450px] h-auto"
          />
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
        <StatsSection />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
