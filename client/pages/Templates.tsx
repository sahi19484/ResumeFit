import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default function Templates() {
  const templates = [
    {
      name: "Modern Clean",
      description: "Sleek and professional. Perfect for tech roles.",
    },
    {
      name: "Classic Professional",
      description: "Timeless design trusted by HR teams.",
    },
    {
      name: "Bold Impact",
      description: "Stand out with modern typography and spacing.",
    },
    {
      name: "Minimal Focus",
      description: "Clean whitespace highlights your achievements.",
    },
    {
      name: "Executive Summary",
      description: "Perfect for leadership and senior roles.",
    },
    {
      name: "Creative Brief",
      description: "Modern layout for creative and tech positions.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-foreground mb-4">
            ATS-Validated Resume Templates
          </h1>
          <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Every template is tested and validated to pass ATS parsing. Choose the style that works best for your industry.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-white overflow-hidden hover:border-primary transition"
              >
                {/* Template Preview */}
                <div className="h-64 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                  <div className="w-full h-full bg-white p-6 space-y-3">
                    <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">ATS Validated</Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
