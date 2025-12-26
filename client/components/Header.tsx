import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary hover:opacity-80 transition">
          <div className="bg-primary rounded-lg p-2">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span>ResumeFit</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Home
          </Link>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            How It Works
          </a>
          <Link
            to="/pricing"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Pricing
          </Link>
          <Link
            to="/templates"
            className="text-sm font-medium text-foreground hover:text-primary transition"
          >
            Templates
          </Link>
        </nav>

        {/* CTA Button */}
        <Link to="/generator">
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
}
