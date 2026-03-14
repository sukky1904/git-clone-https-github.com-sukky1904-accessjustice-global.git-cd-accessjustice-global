import { Link } from "react-router-dom";
import { Mail, MapPin, Globe, Twitter, Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "For Citizens": [
      { href: "/get-legal-help", label: "Get Legal Help" },
      { href: "/ai-assistant", label: "AI Legal Assistant" },
      { href: "/how-it-works", label: "How It Works" },
    ],
    "For Professionals": [
      { href: "/for-lawyers", label: "For Lawyers" },
      { href: "/for-ngos", label: "For NGOs & Donors" },
      { href: "/for-governments", label: "For Governments" },
    ],
    "Company": [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact" },
    ],
  };

  return (
    <footer className="bg-[#0A0A0A] text-white" data-testid="footer">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4 bg-white rounded-lg p-2" data-testid="footer-logo">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ai-legal-test/artifacts/289e0s1q_justice%20ai%20logo.png" 
                  alt="AccessJustice.Global Logo" 
                  className="h-14 w-auto"
                />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
                Justice for Everyone. Designed for Humanity. Using AI to make legal guidance accessible, 
                affordable, and understandable for everyone.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#047A6C]" />
                  <a href="mailto:info@accessjustice.global" className="hover:text-white transition-colors">
                    info@accessjustice.global
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#047A6C]" />
                  <span>Global Operations</span>
                </div>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-4 text-white">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-[#047A6C] transition-colors text-sm"
                        data-testid={`footer-link-${link.href.slice(1)}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} AccessJustice.Global. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-[#047A6C] transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#047A6C] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#047A6C] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
