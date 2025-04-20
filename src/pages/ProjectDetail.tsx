
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Project, projects } from "@/data/projects";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState<number | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundProject = projects.find(p => p.id === parseInt(id));
      
      if (foundProject) {
        setProject(foundProject);
        // If project has a discount, set it as initial discount
        if (foundProject.discountPercentage) {
          setDiscount(foundProject.discountPercentage);
        }
      } else {
        navigate("/");
      }
    }
  }, [id, navigate]);
  
  if (!project) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const handlePrevImage = () => {
    setActiveImage(prev => (prev === 0 ? project.images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setActiveImage(prev => (prev === project.images.length - 1 ? 0 : prev + 1));
  };
  
  const handleApplyPromoCode = () => {
    if (promoCode === "444555") {
      toast({
        title: "Student Discount Applied!",
        description: "10% discount has been applied to your purchase.",
      });
      setDiscount(10);
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid.",
        variant: "destructive",
      });
    }
  };
  
  const handleBuyNow = () => {
    toast({
      title: "Purchase Successful!",
      description: `You have successfully purchased ${project.title}.`,
    });
    
    // In a real app, would redirect to checkout or confirmation page
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  const calculatePrice = () => {
    if (discount) {
      return (project.price - (project.price * discount / 100)).toFixed(2);
    }
    return project.price.toFixed(2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-video bg-secondary/30">
                <img
                  src={project.images[activeImage]}
                  alt={`${project.title} preview ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                {project.images.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`cursor-pointer w-24 h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-colors ${
                      activeImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              
              <div className="flex flex-wrap gap-2 my-4">
                {project.techStack.map(tech => (
                  <span 
                    key={tech}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="text-muted-foreground">{project.shortDescription}</p>
                </div>
                
                <div className="py-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${calculatePrice()}</span>
                    {discount && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${project.price.toFixed(2)}
                      </span>
                    )}
                    {discount && (
                      <span className="bg-accent text-accent-foreground font-semibold rounded-full px-3 py-1 text-sm">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="px-3 py-2 border rounded-md text-sm w-40"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleApplyPromoCode}
                    >
                      Apply
                    </Button>
                    <div className="text-sm discount-badge px-2 py-1 rounded-md ml-auto">
                      STUDENT OFFER: 10% DISCOUNT with code 444555
                    </div>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="mt-4 w-full" 
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="description" className="mt-12">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Professional, fully responsive design</li>
                    <li>Comprehensive documentation</li>
                    <li>Ready-to-deploy codebase</li>
                    <li>Modern technology stack ({project.techStack.join(", ")})</li>
                    <li>Scalable architecture</li>
                    <li>Industry best practices</li>
                    <li>SEO optimized</li>
                    <li>6 months technical support</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="support" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    All projects come with 6 months of technical support included in the purchase price.
                    Our support includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Installation assistance</li>
                    <li>Bug fixes</li>
                    <li>Questions about project functionality</li>
                    <li>Email support with 24-48 hour response time</li>
                  </ul>
                  <p className="font-semibold mt-4">
                    For extended support or custom modifications, please contact us for a quote.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
