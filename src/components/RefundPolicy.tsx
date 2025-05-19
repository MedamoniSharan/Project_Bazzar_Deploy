// RefundPolicy.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const RefundPolicy = () => {
  return (
    <>
      <Header />
      <section className="container py-16">
        <h1 className="text-3xl font-bold text-primary mb-6">Cancellation and Refund Policy</h1>
        <p className="mb-4">Due to the digital nature of our products, we do not offer refunds once a project is purchased. However, exceptions may apply in the following cases:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Duplicate payment due to technical error.</li>
          <li>Corrupt or unusable file issues (must be reported within 48 hours).</li>
          <li>Unauthorized transaction report with proper evidence.</li>
        </ul>
        <p>Contact us for any refund concerns at <a className="text-primary" href="mailto:studentprojectbazaar@gmail.com">studentprojectbazaar@gmail.com</a>.</p>
      </section>
      <Footer />
    </>
  );
};

export default RefundPolicy;