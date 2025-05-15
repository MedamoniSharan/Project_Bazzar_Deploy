
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectModel } from "@/models/Project";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/data/projects";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  FileText,
  ShoppingCart,
  BarChart,
  Image,
  Video,
  DollarSign,
  Percent
} from "lucide-react";

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    shortDescription: "",
    price: 0,
    discountPercentage: 0,
    techStack: "",
    domain: "",
    images: ["placeholder.svg"],
    videos: [],
    featured: false,
    soldCount: 0,
  });
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPurchases: 0,
    totalProjects: 0,
    totalRevenue: 0
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState<string>("");
  const [videoUrls, setVideoUrls] = useState<string>("");

  useEffect(() => {
    // Simulate fetching stats and projects from API
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // Mock data for demo purposes
        setStats({
          totalUsers: 126,
          totalPurchases: 285,
          totalProjects: 10,
          totalRevenue: 24850
        });
        
        import("@/data/projects").then(({ projects }) => {
          setProjects(projects);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process image URLs from comma-separated string to array
    const imagesArray = imageUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    // Process video URLs from comma-separated string to array
    const videosArray = videoUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    // Use default placeholder if no images provided
    const finalImages = imagesArray.length > 0 ? imagesArray : ["placeholder.svg"];
    
    try {
      await ProjectModel.create({
        ...newProject,
        id: Date.now(),
        techStack: newProject.techStack.split(",").map(tech => tech.trim()),
        images: finalImages,
        videos: videosArray,
      });
      
      toast({
        title: "Success",
        description: "Project added successfully",
      });
      
      // Reset form
      setNewProject({
        title: "",
        description: "",
        shortDescription: "",
        price: 0,
        discountPercentage: 0,
        techStack: "",
        domain: "",
        images: ["placeholder.svg"],
        videos: [],
        featured: false,
        soldCount: 0,
      });
      setImageUrls("");
      setVideoUrls("");
      
      // Update projects list
      import("@/data/projects").then(({ projects }) => {
        setProjects(projects);
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add project",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <LayoutDashboard className="mr-2 h-6 w-6" />
        Admin Dashboard
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPurchases}</div>
            <p className="text-xs text-muted-foreground">
              Projects purchased
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Available projects
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              Total revenue
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="projects">
        <TabsList className="mb-6">
          <TabsTrigger value="projects" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            <span>Manage Projects</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>Add Project</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                Manage your uploaded projects here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-4 text-center">Loading projects...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.id}</TableCell>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>${project.price}</TableCell>
                        <TableCell>{project.domain}</TableCell>
                        <TableCell>{project.soldCount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>Fill in the project details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={newProject.shortDescription}
                    onChange={(e) => setNewProject(prev => ({ ...prev, shortDescription: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    rows={5}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      value={newProject.price}
                      onChange={(e) => setNewProject(prev => ({ ...prev, price: Number(e.target.value) }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discount" className="flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      Discount %
                    </Label>
                    <Input
                      id="discount"
                      type="number"
                      min="0"
                      max="100"
                      value={newProject.discountPercentage}
                      onChange={(e) => setNewProject(prev => ({ ...prev, discountPercentage: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                  <Input
                    id="techStack"
                    value={newProject.techStack}
                    onChange={(e) => setNewProject(prev => ({ ...prev, techStack: e.target.value }))}
                    placeholder="React, TypeScript, Tailwind"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain">Domain</Label>
                  <Input
                    id="domain"
                    value={newProject.domain}
                    onChange={(e) => setNewProject(prev => ({ ...prev, domain: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images" className="flex items-center">
                    <Image className="h-4 w-4 mr-1" />
                    Images (comma-separated URLs)
                  </Label>
                  <Input
                    id="images"
                    value={imageUrls}
                    onChange={(e) => setImageUrls(e.target.value)}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    If none provided, a placeholder will be used
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videos" className="flex items-center">
                    <Video className="h-4 w-4 mr-1" />
                    Videos (comma-separated URLs)
                  </Label>
                  <Input
                    id="videos"
                    value={videoUrls}
                    onChange={(e) => setVideoUrls(e.target.value)}
                    placeholder="https://example.com/video1.mp4, https://example.com/video2.mp4"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="featured">Featured Project</Label>
                  <div className="flex items-center">
                    <Input
                      id="featured"
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={newProject.featured}
                      onChange={(e) => setNewProject(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <span className="text-sm">Mark as featured project</span>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Add Project
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
