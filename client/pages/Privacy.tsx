import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: January 2024
          </p>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                ResumeFit ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We only process data from public LinkedIn profiles that you choose to share with us. We never request your LinkedIn credentials or password.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Profile information extracted from your LinkedIn profile</li>
                <li>Email address (if provided for resume delivery)</li>
                <li>Job title you're targeting (optional)</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Generate your ATS-optimized resume</li>
                <li>Improve our service and user experience</li>
                <li>Send you your generated resume</li>
                <li>Provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground">
                <strong>Free Users:</strong> Your extracted profile data is stored for 24-72 hours, then automatically deleted.
              </p>
              <p className="text-muted-foreground mt-3">
                <strong>Pro Users:</strong> Your data is retained until you request deletion or cancel your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground">
                We use industry-standard encryption and security practices to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please contact us at privacy@resumefit.com.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
