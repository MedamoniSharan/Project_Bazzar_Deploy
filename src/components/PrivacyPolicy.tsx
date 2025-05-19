// PrivacyPolicy.tsx
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <section className="container py-16">
        <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
        <p className="mb-4">At Project Bazaar, your privacy is important to us. We collect only the information necessary to provide our services and do not share your personal data with third parties without your consent.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Information collected includes name, email, and payment details during checkout.</li>
          <li>Data is stored securely and used only for service delivery and communication.</li>
          <li>Users can contact us at any time to request data deletion or modification.</li>
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;