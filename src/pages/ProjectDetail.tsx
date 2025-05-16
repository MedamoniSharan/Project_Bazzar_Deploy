import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import Lottie from "lottie-react";
import loaderAnimation from "./infinite-loader.json";

interface Project {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
  discountPercentage: number;
  techStack: string[];
  images: string[];
  features: string;
  support: string;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`https://project-palace-paradise.onrender.com/api/projects/${id}`);
        const data = await response.json();
        setProject(data);
        if (data.discountPercentage) setDiscount(data.discountPercentage);
      } catch (error) {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProject();
  }, [id, navigate]);

  const getImage = (index: number) => {
    if (!project || !project.images.length) return "/placeholder.svg";
    return project.images[index] || "/placeholder.svg";
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  const handleApplyPromoCode = () => {
    if (promoCode === "444555") {
      toast({
        title: "Student Discount Applied!",
        description: "10% discount has been applied.",
      });
      setDiscount(10);
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "This promo code is not valid.",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = () => {
    toast({
      title: "Purchase Successful!",
      description: `You bought ${project?.title}`,
    });
    setTimeout(() => navigate("/"), 2000);
  };

  const calculatePrice = () => {
    if (!project) return "0.00";
    const price = discount ? project.price - (project.price * discount) / 100 : project.price;
    return price.toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie animationData={loaderAnimation} loop className="w-40 h-40" />
      </div>
    );
  }

  if (!project) {
    return <div className="flex items-center justify-center min-h-screen">Project not found.</div>;
  }

  const imageCount = project.images.length;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-secondary/30">
              <img
                src={getImage(activeImage)}
                alt={`Preview ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {[...Array(imageCount)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`cursor-pointer w-24 h-16 border-2 rounded overflow-hidden flex-shrink-0 ${
                    activeImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={getImage(index)}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="flex flex-wrap gap-2 my-4">
              {project.techStack.map((tech) => (
                <span key={tech} className="bg-secondary px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="text-muted-foreground mb-4">{project.shortDescription}</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">₹{calculatePrice()}</span>
              {discount && (
                <span className="text-xl line-through text-muted-foreground">
                  ₹{project.price.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="bg-accent px-3 py-1 rounded-full text-sm">
                  {discount}% OFF
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
                className="px-3 py-2 border rounded-md text-sm w-40"
              />
              <Button variant="outline" onClick={handleApplyPromoCode}>
                Apply
              </Button>
            </div>
            <div className="text-sm mt-2 text-green-600">
              STUDENT OFFER: 10% DISCOUNT with code 444555
            </div>
            <Button size="lg" className="mt-6 w-full" onClick={handleBuyNow}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Buy Now
            </Button>
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.description}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="features">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.features}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="support">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Support Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{project.support}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
