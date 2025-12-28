import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <AlertTriangle className="h-12 w-12 text-primary/20 mb-6" />
        <h1 className="font-serif text-4xl mb-4 text-primary">404 Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md font-light">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-8 py-3 bg-primary text-white text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors">
            Return Home
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
