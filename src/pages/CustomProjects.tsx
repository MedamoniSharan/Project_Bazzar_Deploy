// src/pages/CustomProjects.tsx
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";

const CustomProjects = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-10">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default CustomProjects;
