// TermsConditions.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TermsConditions = () => {
  return (
    <>
      <Header />
      <section className="container py-16">
        <h1 className="text-3xl font-bold text-primary mb-6">Terms and Conditions</h1>
        <p className="mb-4">These Terms and Conditions govern your use of Project Bazaar. By accessing our website, you agree to comply with and be bound by the following terms:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>All content is provided as-is. We make no guarantees on project compatibility with all platforms.</li>
          <li>Projects are for personal or client use. Redistribution or reselling is prohibited without permission.</li>
          <li>Any misuse or breach of terms may result in account termination without notice.</li>
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default TermsConditions;