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
import { useToast } from "@/components/ui/use-toast";
import { LayoutDashboard, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function AdminDashboard() {
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
    features: "",
    support: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPurchases: 0,
    totalProjects: 0,
    totalRevenue: 0,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState("");
  const [videoUrls, setVideoUrls] = useState("");
  const [mappings, setMappings] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [mappingUrl, setMappingUrl] = useState("");
  const [editingMappingId, setEditingMappingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://project-palace-paradise.onrender.com/api/projects");
        const data = await res.json();
        setProjects(data);
        setStats((prev) => ({
          ...prev,
          totalProjects: data.length,
          totalRevenue: data.reduce((acc, p) => acc + p.price, 0),
        }));
        setLoading(false);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load projects", variant: "destructive" });
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`https://project-palace-paradise.onrender.com/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((proj) => proj._id !== id));
      toast({ title: "Deleted", description: "Project removed successfully" });
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesArray = imageUrls.split(",").map((url) => url.trim()).filter(Boolean);
    const videosArray = videoUrls.split(",").map((url) => url.trim()).filter(Boolean);
    const payload = {
      ...newProject,
      techStack: newProject.techStack.split(",").map((t) => t.trim()),
      images: imagesArray.length > 0 ? imagesArray : ["placeholder.svg"],
      videos: videosArray,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `https://project-palace-paradise.onrender.com/api/projects/${editingId}`
      : "https://project-palace-paradise.onrender.com/api/projects";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit project");
      const result = await res.json();
      toast({ title: "Success", description: `Project '${result.title}' ${editingId ? "updated" : "created"} successfully` });
      if (editingId) {
        setProjects((prev) => prev.map((proj) => (proj._id === editingId ? result : proj)));
        setIsEditOpen(false);
      } else {
        setProjects((prev) => [result, ...prev]);
      }
      setEditingId(null);
      setNewProject({
        title: "", description: "", shortDescription: "", price: 0, discountPercentage: 0,
        techStack: "", domain: "", images: ["placeholder.svg"], videos: [],
        featured: false, soldCount: 0, features: "", support: ""
      });
      setImageUrls("");
      setVideoUrls("");
    } catch (err) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const res = await fetch("https://project-palace-paradise.onrender.com/api/mappings");
        const data = await res.json();
        setMappings(data);
      } catch (err) {
        toast({ title: "Error", description: "Failed to fetch mappings", variant: "destructive" });
      }
    };
    fetchMappings();
  }, [toast]);


    const handleMappingSave = async () => {
      try {
        const selectedProject = projects.find((p) => p._id === selectedProjectId);
        if (!selectedProject) throw new Error("Project not found");
  
        const method = editingMappingId ? "PUT" : "POST";
        const url = editingMappingId
          ? `https://project-palace-paradise.onrender.com/api/mappings/${editingMappingId}`
          : "https://project-palace-paradise.onrender.com/api/mappings";
  
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId: selectedProjectId,
            projectTitle: selectedProject.title,
            url: mappingUrl,
          }),
        });
  
        const result = await res.json();
        if (editingMappingId) {
          setMappings((prev) => prev.map((m) => (m._id === editingMappingId ? result : m)));
        } else {
          setMappings((prev) => [result, ...prev]);
        }
  
        setSelectedProjectId("");
        setMappingUrl("");
        setEditingMappingId(null);
        toast({ title: "Success", description: "Mapping saved successfully" });
      } catch (err) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    };
  

    const handleMappingDelete = async (id) => {
      try {
        await fetch(`https://project-palace-paradise.onrender.com/api/mappings/${id}`, { method: "DELETE" });
        setMappings((prev) => prev.filter((m) => m._id !== id));
        toast({ title: "Deleted", description: "Mapping deleted successfully" });
      } catch (err) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    };

  const ProjectForm = (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="shortDescription">Short Description</Label>
        <Input id="shortDescription" value={newProject.shortDescription} onChange={(e) => setNewProject({ ...newProject, shortDescription: e.target.value })} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" rows={5} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} required />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" value={newProject.price} onChange={(e) => setNewProject({ ...newProject, price: +e.target.value })} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="discount">Discount %</Label>
          <Input type="number" id="discount" value={newProject.discountPercentage} onChange={(e) => setNewProject({ ...newProject, discountPercentage: +e.target.value })} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="techStack">Tech Stack</Label>
        <Input id="techStack" value={newProject.techStack} onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="domain">Domain</Label>
        <Input id="domain" value={newProject.domain} onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="images">Image URLs (comma-separated)</Label>
        <Input id="images" value={imageUrls} onChange={(e) => setImageUrls(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="videos">Video URLs (comma-separated)</Label>
        <Input id="videos" value={videoUrls} onChange={(e) => setVideoUrls(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="features">Features</Label>
        <Textarea id="features" rows={3} value={newProject.features} onChange={(e) => setNewProject({ ...newProject, features: e.target.value })} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="support">Support</Label>
        <Textarea id="support" rows={3} value={newProject.support} onChange={(e) => setNewProject({ ...newProject, support: e.target.value })} required />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" checked={newProject.featured} onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })} />
        <Label htmlFor="featured">Mark as featured</Label>
      </div>
      <Button type="submit" className="mt-2">{editingId ? "Update Project" : "Submit Project"}</Button>
    </form>
  );

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <LayoutDashboard className="mr-2 h-6 w-6" /> Admin Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card><CardHeader><CardTitle>Total Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalUsers}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Total Purchases</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalPurchases}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Total Projects</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalProjects}</div></CardContent></Card>
        <Card><CardHeader><CardTitle>Total Revenue</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${stats.totalRevenue}</div></CardContent></Card>
      </div>

      <Tabs defaultValue="projects">
        <TabsList className="mb-6">
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="add">Add Project</TabsTrigger>
          <TabsTrigger value="mappings">Mappings</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader><CardTitle>All Projects</CardTitle></CardHeader>
            <CardContent>
              {loading ? <p>Loading...</p> : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Domain</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((p) => (
                      <TableRow key={p._id}>
                        <TableCell>{p._id}</TableCell>
                        <TableCell>{p.title}</TableCell>
                        <TableCell>{p.domain}</TableCell>
                        <TableCell>{p.soldCount}</TableCell>
                        <TableCell className="space-x-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            setNewProject({ ...p, techStack: p.techStack.join(", ") });
                            setImageUrls(p.images.join(", "));
                            setVideoUrls(p.videos.join(", "));
                            setEditingId(p._id);
                            setIsEditOpen(true);
                          }}>Edit</Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>Delete</Button>
                        </TableCell>
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
              <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
              <CardDescription>Fill out the project details below.</CardDescription>
            </CardHeader>
            <CardContent>{ProjectForm}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mappings">
          <Card>
            <CardHeader><CardTitle>Project Mappings</CardTitle></CardHeader>
            <CardContent>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
              >
                <option value="">-- Select Project --</option>
                {projects.map((p) => (
                  <option key={p._id} value={p._id}>{p.title}</option>
                ))}
              </select>
              <Input
                value={mappingUrl}
                onChange={(e) => setMappingUrl(e.target.value)}
                placeholder="Enter URL"
                className="my-2"
              />
              <Button onClick={handleMappingSave}>{editingMappingId ? "Update" : "Save"}</Button>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mappings.map((m) => (
                    <TableRow key={m._id}>
                      <TableCell>{m.projectTitle}</TableCell>
                      <TableCell>{m.url}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => {
                            setSelectedProjectId(m.projectId);
                            setMappingUrl(m.url);
                            setEditingMappingId(m._id);
                          }}
                        >Edit</Button>
                        <Button variant="destructive" onClick={() => handleMappingDelete(m._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-lg rounded-md z-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-xl font-semibold">Edit Project</Dialog.Title>
              <Dialog.Close asChild>
                <Button variant="ghost"><X className="w-5 h-5" /></Button>
              </Dialog.Close>
            </div>
            <div className="mt-2">{ProjectForm}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
