// ContactUs.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ContactUs = () => {
  return (
    <>
      <Header />
      <section className="container py-16">
        <h1 className="text-3xl font-bold text-primary mb-6">Contact Us</h1>
        <p className="mb-4">We’re here to help! For any inquiries, support requests, or custom project needs, feel free to reach out:</p>
        <ul className="space-y-2">
          <li><strong>Email:</strong> <a href="mailto:studentprojectbazaar@gmail.com" className="text-primary">studentprojectbazaar@gmail.com</a></li>
          <li><strong>Address:</strong> Building 12B, Floor 14, Mindspace, Raidurg Metro, Hyderabad</li>
          <li><strong>Instagram:</strong> <a href="https://www.instagram.com/studentprojectbazaar/" className="text-primary" target="_blank">@studentprojectbazaar</a></li>
          <li><strong>YouTube:</strong> <a href="https://www.youtube.com/@StudentProjectBazaar" className="text-primary" target="_blank">StudentProjectBazaar</a></li>
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;