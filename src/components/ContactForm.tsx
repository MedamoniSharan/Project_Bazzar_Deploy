
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [files, setFiles] = useState<{ images: File[], documents: File[] }>({
    images: [],
    documents: [],
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Form submitted successfully",
      description: "We will get back to you soon!",
    });
  };
  
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "documents"
  ) => {
    if (!e.target.files?.length) return;
    
    const newFiles = Array.from(e.target.files);
    
    setFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }));
  };
  
  const removeFile = (index: number, type: "images" | "documents") => {
    setFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  return (
    <section className="py-12" id="contact">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Request a Custom Project</h2>
        
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Fill out the form below to request a custom project or get in touch with our team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Title</Label>
                  <Input id="project-name" placeholder="E-Commerce Website" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please describe your project requirements in detail..." 
                  className="min-h-32"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="images">Sample Images (Optional)</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange(e, "images")}
                />
                {files.images.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {files.images.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="w-16 h-16 border rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFile(index, "images")}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documents">Documents (Optional)</Label>
                <Input
                  id="documents"
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  multiple
                  onChange={(e) => handleFileChange(e, "documents")}
                />
                {files.documents.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {files.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-secondary/50 p-2 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          className="text-destructive"
                          onClick={() => removeFile(index, "documents")}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Button type="submit" className="w-full">Submit Request</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
