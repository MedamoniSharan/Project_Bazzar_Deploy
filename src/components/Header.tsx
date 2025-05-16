import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { LoginForm } from "./LoginForm";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center font-bold text-xl text-primary">
          <span>ProjectBazaar</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-primary">
              Projects
            </Link>
            <Link to="/contact" className="transition-colors hover:text-primary">
              Custom Projects
            </Link>
            <Link to="/purchased" className="transition-colors hover:text-primary">
              Purchased Projects
            </Link>
            {isAuthenticated && (
              <Link to="/admin" className="transition-colors hover:text-primary">
                Admin Dashboard
              </Link>
            )}
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Button variant="default" size="sm" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <LoginForm />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
        
        <button 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="container md:hidden py-4 bg-background border-t">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            <Link 
              to="/" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Projects
            </Link>
            <Link 
              to="/purchased" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Purchased Projects
            </Link>
            <Button variant="default" size="sm" className="w-full">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
