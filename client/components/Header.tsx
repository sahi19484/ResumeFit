import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl animate-fade-in">
      <div className="container mx-auto px-4 py-3.5 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 font-bold text-xl text-foreground hover:opacity-80 transition-opacity"
        >
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-2.5 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 animate-scale-in">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="gradient-anim font-black">
            ResumeFit
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 relative group"
          >
            How It Works
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </a>
          <Link
            to="/marketplace"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 relative group"
          >
            Starter Packs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            to="/templates"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 relative group"
          >
            Templates
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            to="/pricing"
            className="text-sm font-semibold text-foreground hover:text-primary transition-colors duration-300 relative group"
          >
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        {/* CTA Button */}
        <Link to="/generator">
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-semibold"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
}
