// ShippingPolicy.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const ShippingPolicy = () => {
  return (
    <>
      <Header />
      <section className="container py-16">
        <h1 className="text-3xl font-bold text-primary mb-6">Shipping and Delivery</h1>
        <p className="mb-4">All projects listed on Project Bazaar are delivered digitally. There are no physical goods shipped. Here's how it works:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Once payment is confirmed, you’ll receive the project via email/download link instantly or within 15 minutes.</li>
          <li>Ensure your email is entered correctly during checkout to avoid delivery issues.</li>
          <li>Contact support for failed or delayed deliveries.</li>
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default ShippingPolicy;