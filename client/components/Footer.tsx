import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-b from-background to-muted/10 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-lg p-2">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-black text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                ResumeFit
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Turn your LinkedIn profile into an ATS-ready resume in minutes. No credentials needed.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-foreground">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/generator" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Generator
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Templates
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Pricing
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-foreground">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  About
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Blog
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Privacy
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group inline-block">
                  Terms
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 ResumeFit. Built with care by the team. <span className="text-primary font-semibold">All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
