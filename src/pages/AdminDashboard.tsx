
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectModel } from "@/models/Project";
import { useToast } from "@/components/ui/use-toast";

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
    featured: false,
    soldCount: 0,
  });

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ProjectModel.create({
        ...newProject,
        id: Date.now(),
        techStack: newProject.techStack.split(",").map(tech => tech.trim()),
      });
      toast({
        title: "Success",
        description: "Project added successfully",
      });
      setNewProject({
        title: "",
        description: "",
        shortDescription: "",
        price: 0,
        discountPercentage: 0,
        techStack: "",
        domain: "",
        images: ["placeholder.svg"],
        featured: false,
        soldCount: 0,
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
              <Input
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
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
                <Label htmlFor="discount">Discount %</Label>
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

            <Button type="submit" className="w-full">
              Add Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
