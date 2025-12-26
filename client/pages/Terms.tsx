import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: January 2024
          </p>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using ResumeFit, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground mb-3">
                Permission is granted to temporarily download one copy of the materials (information or software) on ResumeFit for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software on ResumeFit</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground">
                The materials on ResumeFit are provided on an 'as is' basis. ResumeFit makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
              <p className="text-muted-foreground">
                In no event shall ResumeFit or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ResumeFit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground">
                The materials appearing on ResumeFit could include technical, typographical, or photographic errors. ResumeFit does not warrant that any of the materials on its website are accurate, complete, or current.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Links</h2>
              <p className="text-muted-foreground">
                ResumeFit has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by ResumeFit of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
              <p className="text-muted-foreground">
                ResumeFit may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which ResumeFit operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at legal@resumefit.com.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
