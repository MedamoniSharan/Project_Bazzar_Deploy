import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Lottie from "lottie-react";
import projectLoader from "./project-loader.json";
import noProjectsFound from "./no_projectFound.json"; // ✅ Import no project animation
import { Download } from "lucide-react";

interface Purchased {
  _id: string;
  projectId: {
    _id: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    images: string[];
    price: number;
  };
  pricePaid: number;
  createdAt: string;
  driveUrl: string;
}

export default function PurchasedProjects() {
  const [purchasedProjects, setPurchasedProjects] = useState<Purchased[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, user, loading: authLoading } = useAuth();

  useEffect(() => {

    if (authLoading) return;
     
    if (!isAuthenticated || !user?.email) {
      navigate("/loginuser");
      return;
    }

    fetch(`https://project-palace-paradise.onrender.com/api/purchases/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => setPurchasedProjects(data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-10 px-4 sm:px-6 lg:px-8 flex-1">
        <h1 className="text-2xl font-bold mb-6">Your Purchased Projects</h1>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Lottie animationData={projectLoader} loop className="w-40 h-40" />
          </div>
        ) : purchasedProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Lottie animationData={noProjectsFound} loop className="w-60 h-60" />
            <p className="mt-4 text-lg text-muted-foreground">No projects purchased yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedProjects.map((purchase) => (
              <Card key={purchase._id}>
                <CardHeader>
                  <CardTitle>{purchase.projectId.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={purchase.projectId.images?.[0] || "/placeholder.svg"}
                    alt="Project Thumbnail"
                    className="rounded w-full h-40 object-cover mb-3"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    {purchase.projectId.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {purchase.projectId.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="bg-secondary text-xs px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Separator className="my-2" />
                  <p className="text-sm">Paid: ₹{purchase.pricePaid.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">
                    Purchased on {new Date(purchase.createdAt).toLocaleDateString()}
                  </p>

                  <Button
                    className="mt-4 w-full flex items-center justify-center gap-2"
                    onClick={() => {
                      if (purchase.driveUrl) {
                        window.open(purchase.driveUrl, "_blank");
                      } else {
                        alert("No drive link available for this project.");
                      }
                    }}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download / Upload Your Project</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
