
import { Header } from "@/components/Header";
import { TopProjects } from "@/components/TopProjects";
import { ProjectFilter } from "@/components/ProjectFilter";
import { TechStackSlider } from "@/components/TechStackSlider";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-secondary/20 py-16">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Ready-to-Use Projects for Developers
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                High-quality, professionally built projects ready to deploy. Save time and accelerate your development.
              </p>
              <div className="discount-badge inline-block px-4 py-2 rounded-md text-lg font-semibold mb-8">
                STUDENT OFFER: 10% DISCOUNT with code 444555
              </div>
            </div>
          </div>
        </section>

        <TopProjects />
        <ProjectFilter />
        <TechStackSlider />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
