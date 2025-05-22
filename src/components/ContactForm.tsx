import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Lottie from "lottie-react";
import mailSuccessAnimation from "../pages/emial_animation.json"; // ✅ your downloaded animation

export function ContactForm() {
  const { toast } = useToast();

  const [files, setFiles] = useState<{ images: File[]; documents: File[] }>({
    images: [],
    documents: [],
  });
  const [loading, setLoading] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "documents"
  ) => {
    if (!e.target.files?.length) return;
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newFiles],
    }));
  };

  const removeFile = (index: number, type: "images" | "documents") => {
    setFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    files.images.forEach((file) => payload.append("images", file));
    files.documents.forEach((file) => payload.append("documents", file));

    try {
      const response = await fetch("https://project-palace-paradise.onrender.com/send-email", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (response.ok) {
        setMailSent(true);
        setFormData({ name: "", email: "", phone: "", projectName: "", description: "" });
        setFiles({ images: [], documents: [] });
      } else {
        toast({ title: "❌ Error", description: data.message });
      }
    } catch (error) {
      toast({ title: "❌ Error", description: "Failed to send email." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Success view with animation
  if (mailSent) {
    return (
      <section className="py-16 flex flex-col items-center justify-center text-center">
        <Lottie animationData={mailSuccessAnimation} className="w-64 h-64" loop={false} />
        <h2 className="text-3xl font-bold text-primary mt-4">Mail sent successfully!</h2>
        <p className="text-muted-foreground mt-2">We will get back to you shortly.</p>
        <Button onClick={() => setMailSent(false)} className="mt-6">
          Send Another Request
        </Button>
      </section>
    );
  }

  return (
    <section className="py-12 relative" id="contact">
      {loading && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
      )}

      <div className="container relative z-0">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
          Request a Custom Project
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-lg">
          We’ll build what you envision — share your idea now.
        </p>

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
                  <Input id="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Title</Label>
                  <Input id="projectName" value={formData.projectName} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
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
                          className="absolute top-0 right-0 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
