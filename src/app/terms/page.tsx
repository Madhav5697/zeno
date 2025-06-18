export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#111111] text-white px-6 sm:px-10 py-40">
      <h1 className="text-4xl font-bold text-center mb-12 animate-fade-down">
        Terms & Conditions
      </h1>

      <div className="max-w-3xl mx-auto glass-container space-y-8 text-white/90 leading-relaxed text-sm sm:text-base">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Prompt Refiner, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Use of the Site</h2>
          <p>
            You agree to use this site only for lawful purposes. Any attempt to disrupt or misuse the service will result in termination of access.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
          <p>
            All content and functionality on the site, including text, design, and code, are owned by Prompt Refiner and are protected by copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Limitation of Liability</h2>
          <p>
            Prompt Refiner is not liable for any damages that may occur from the use or inability to use the service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Changes to Terms</h2>
          <p>
            We may update these terms at any time without prior notice. Continued use of the site means you accept the new terms.
          </p>
        </section>

        <p className="text-xs text-white/50 mt-10">
          Last updated: June 2025
        </p>
      </div>
    </div>
  );
}
