import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying us out",
      features: [
        "1 resume export",
        "Basic ATS optimization",
        "24-hour data retention",
        "DOCX & PDF download",
        "Standard support",
      ],
    },
    {
      name: "Pro",
      price: "$12",
      period: "/month",
      description: "For serious job seekers",
      features: [
        "Unlimited exports",
        "Advanced ATS optimization",
        "Job title keyword alignment",
        "Resume version history",
        "ATS compatibility scoring",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams & recruiters",
      features: [
        "API access",
        "Bulk generation",
        "SSO integration",
        "Custom templates",
        "Dedicated support",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-center text-muted-foreground mb-16">
              Choose the plan that works for you. No hidden fees.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`rounded-lg border-2 p-8 ${
                    plan.highlighted
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold mb-4">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground ml-1">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6">
                    {plan.description}
                  </p>

                  <Button
                    className={`w-full mb-8 h-10 ${
                      plan.highlighted
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Get Started
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <div key={j} className="flex gap-3 items-start">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mt-20 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: "Can I change my plan anytime?",
                    a: "Yes, you can upgrade or downgrade your plan at any time.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards and PayPal.",
                  },
                  {
                    q: "Is there a free trial?",
                    a: "Yes! The free plan includes 1 resume export to get started.",
                  },
                  {
                    q: "What happens to my data if I cancel?",
                    a: "You can request data deletion anytime. We'll remove all your information within 24 hours.",
                  },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-lg border border-border hover:border-primary transition"
                  >
                    <h4 className="font-semibold text-foreground mb-2">
                      {faq.q}
                    </h4>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
