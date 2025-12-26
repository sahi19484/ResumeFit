import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, Zap, ArrowRight } from "lucide-react";

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      cta: "Get Started",
      gradient: "from-blue-500/20 to-blue-600/20",
      borderGradient: "from-blue-500/30 to-blue-600/30",
      delay: 100,
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
      cta: "Start Free Trial",
      gradient: "from-primary/20 to-primary/10",
      borderGradient: "from-primary to-primary/50",
      highlighted: true,
      delay: 200,
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
      cta: "Contact Sales",
      gradient: "from-purple-500/20 to-purple-600/20",
      borderGradient: "from-purple-500/30 to-purple-600/30",
      delay: 300,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="flex-1 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div
              className={`text-center mb-16 transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Simple, Transparent
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Pricing
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect plan. No hidden fees. Cancel anytime.
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`group relative rounded-2xl transition-all duration-700 ${
                    plan.highlighted ? "md:scale-105 md:shadow-2xl" : ""
                  } ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${plan.delay}ms` : "0ms",
                  }}
                >
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                  />

                  <div
                    className={`relative p-8 rounded-2xl border-2 transition-all duration-500 ${
                      plan.highlighted
                        ? `bg-gradient-to-br ${plan.gradient} border-primary/50`
                        : "bg-white border-border/50 group-hover:border-primary/30"
                    }`}
                  >
                    {/* Badge */}
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-lg">
                          <Zap className="w-4 h-4" />
                          Most Popular
                        </div>
                      </div>
                    )}

                    <div className="pt-4 mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-3">
                        {plan.name}
                      </h3>
                      <div className="mb-3">
                        <span className="text-5xl font-black bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-muted-foreground ml-2 font-semibold">
                            {plan.period}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm font-medium">
                        {plan.description}
                      </p>
                    </div>

                    <Button
                      className={`w-full mb-8 h-11 font-bold transition-all duration-300 ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                          : "border-2 border-border hover:border-primary/50 hover:bg-primary/5"
                      }`}
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="space-y-4">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex gap-3 items-start">
                          <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
              <div
                className={`text-center mb-12 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? "400ms" : "0ms",
                }}
              >
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Can I change my plan anytime?",
                    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal for maximum flexibility.",
                  },
                  {
                    q: "Is there a free trial for Pro?",
                    a: "Absolutely! Start with a free Pro trial for 7 days. No credit card required.",
                  },
                  {
                    q: "What happens to my data if I cancel?",
                    a: "You can request data deletion anytime. We'll permanently remove all your information within 24 hours.",
                  },
                ].map((faq, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 bg-white ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${500 + i * 100}ms` : "0ms",
                    }}
                  >
                    <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                      <span className="text-primary">Q:</span> {faq.q}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <span className="text-accent font-semibold">A:</span>{" "}
                      {faq.a}
                    </p>
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
