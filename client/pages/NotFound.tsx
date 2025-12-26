import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Page not found
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. Let's get you
            back on track.
          </p>
          <Link to="/">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
