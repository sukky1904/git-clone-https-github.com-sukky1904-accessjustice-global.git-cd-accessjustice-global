import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../App";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: "/get-legal-help", label: "Get Legal Help" },
    { href: "/for-lawyers", label: "For Lawyers" },
    { href: "/for-ngos", label: "For NGOs & Donors" },
    { href: "/for-governments", label: "For Governments" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" data-testid="navbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-legal-test/artifacts/trhkf0y7_justice%20ai%20logo.png" 
              alt="AccessJustice Logo" 
              className="h-12 w-auto"
            />
            <span className="font-['Playfair_Display'] text-2xl font-bold text-[#0A0A0A] hidden sm:block">
              Access <span className="text-[#047A6C]">Justice</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-[#047A6C] bg-[#E0F2F1]"
                    : "text-gray-600 hover:text-[#047A6C] hover:bg-gray-50"
                }`}
                data-testid={`nav-link-${link.href.slice(1)}`}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#047A6C] hover:bg-gray-50 rounded-md transition-colors flex items-center gap-1" data-testid="more-dropdown">
                  More <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navLinks.slice(4).map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link to={link.href} className="w-full" data-testid={`dropdown-link-${link.href.slice(1)}`}>
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2" data-testid="user-menu-btn">
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2" data-testid="dashboard-link">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-600" data-testid="logout-btn">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/ai-assistant">
                  <Button className="bg-[#047A6C] hover:bg-[#036459] text-white" data-testid="get-help-btn">
                    Get Help
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="border-[#E5C67A] text-[#0A0A0A] hover:bg-[#F9F3E5]" data-testid="login-btn">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-btn">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? "text-[#047A6C] bg-[#E0F2F1]"
                        : "text-gray-700 hover:text-[#047A6C] hover:bg-gray-50"
                    }`}
                    data-testid={`mobile-nav-${link.href.slice(1)}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-200 pt-4 mt-2">
                  {user ? (
                    <>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button className="w-full mb-2 bg-[#047A6C] hover:bg-[#036459]" data-testid="mobile-dashboard-btn">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => { logout(); setIsOpen(false); }}
                        data-testid="mobile-logout-btn"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/ai-assistant" onClick={() => setIsOpen(false)}>
                        <Button className="w-full mb-2 bg-[#047A6C] hover:bg-[#036459]" data-testid="mobile-get-help-btn">
                          Get Help
                        </Button>
                      </Link>
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full border-[#E5C67A] hover:bg-[#F9F3E5]" data-testid="mobile-login-btn">
                          Login
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
