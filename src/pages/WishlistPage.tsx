import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { useAuth } from "@/context/AuthContext";
import Lottie from "lottie-react";
import loadingAnimation from "./project-loader.json";
import emptyAnimation from "./no_wishlist_animation.json";
import { Project } from "@/pages";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WishlistPage() {
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [wishlistProjects, setWishlistProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until auth loading is complete
    if (authLoading) return;

    // If not authenticated, redirect
    if (!isAuthenticated || !user?.email) {
      navigate("/loginuser");
      return;
    }

    setLoading(true);
    axios
      .get(`https://project-palace-paradise.onrender.com/api/wishlist/${user.email}`)
      .then((res) => {
        setWishlistProjects(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch wishlist", err);
      })
      .finally(() => setLoading(false));
  }, [authLoading, isAuthenticated, user, navigate]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie animationData={loadingAnimation} loop className="w-40 h-40" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Lottie animationData={loadingAnimation} loop className="w-40 h-40" />
          </div>
        ) : wishlistProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Lottie animationData={emptyAnimation} loop className="w-60 h-60" />
            <p className="text-muted-foreground text-lg mt-4">
              No wishlist projects found.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {wishlistProjects.map((project) => (
              <ProjectCard key={project._id} project={project} isFavourite />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
