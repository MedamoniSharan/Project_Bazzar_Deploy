
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/data/projects";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Package } from "lucide-react";

export default function UserDashboard() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [purchasedProjects, setPurchasedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching purchased projects from API
    const fetchPurchasedProjects = async () => {
      try {
        // In a real app, this would be an API call to fetch purchased projects
        // Using the projects data as mock for now
        const response = await fetch('http://localhost:5000/api/user/purchases');
        if (response.ok) {
          const data = await response.json();
          setPurchasedProjects(data);
        } else {
          // Mock data for demo purposes
          import("@/data/projects").then(({ projects }) => {
            setPurchasedProjects(projects.slice(0, 3)); // Pretend user bought first 3 projects
          });
        }
      } catch (error) {
        console.error("Error fetching purchased projects:", error);
        toast({
          title: "Error",
          description: "Failed to load your purchased projects",
          variant: "destructive",
        });
        
        // Mock data for demo purposes
        import("@/data/projects").then(({ projects }) => {
          setPurchasedProjects(projects.slice(0, 3)); // Pretend user bought first 3 projects
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPurchasedProjects();
  }, [toast]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      
      <Tabs defaultValue="purchased">
        <TabsList className="mb-6">
          <TabsTrigger value="purchased" className="flex items-center">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Purchased Projects</span>
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Downloads</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="purchased">
          <Card>
            <CardHeader>
              <CardTitle>Your Purchased Projects</CardTitle>
              <CardDescription>
                Projects you have purchased. Click on any project to view details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <p>Loading your projects...</p>
                </div>
              ) : purchasedProjects.length === 0 ? (
                <div className="text-center py-8">
                  <p className="mb-4">You haven't purchased any projects yet.</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {purchasedProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Your Downloads</CardTitle>
              <CardDescription>
                Track and manage your downloaded project files here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p>Your download history will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
