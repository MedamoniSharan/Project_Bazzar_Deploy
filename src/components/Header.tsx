import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Lock,
  Bell,
  Heart,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center font-bold text-xl text-primary"
        >
          <span>ProjectBazaar</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-primary">
              Projects
            </Link>
            <Link
              to="/favourites"
              className="transition-colors hover:text-primary"
            >
              Wishlist
            </Link>
            <Link
              to="/purchased"
              className="transition-colors hover:text-primary"
            >
              Purchased Projects
            </Link>
          </nav>

          {/* Right-side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    Hi, {user?.name?.split(" ")[0] || "User"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenu.Trigger>

                {/* Ensures dropdown renders correctly in DOM tree */}
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    sideOffset={8}
                    align="end"
                    className="z-50 min-w-[180px] bg-white shadow-lg rounded-md p-1 border text-sm"
                  >
                    <DropdownMenu.Item
                      onClick={() => navigate("/purchased")}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Bell className="h-4 w-4" /> purchased Projects
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      onClick={() => navigate("/favourites")}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <Heart className="h-4 w-4" /> Favourites
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="my-1 border-t" />
                    <DropdownMenu.Item
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => navigate("/loginuser")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
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
            {!isAuthenticated && (
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/loginuser");
                }}
              >
                Login
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
