import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import axios from "axios";
import { API } from "../App";
import {
  Scale,
  MessageSquare,
  FileText,
  Users,
  Briefcase,
  Heart,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Globe2,
  ChevronRight,
  Play,
  Wallet,
  TrendingUp,
  Award,
} from "lucide-react";

const Home = () => {
  const [stats, setStats] = useState({
    users_helped: 1250,
    legal_questions_answered: 3500,
    templates_available: 25,
    verified_lawyers: 45,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const pathCards = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "I Need Legal Help",
      description: "Ask the AI a question about your rights. Download free legal templates. Connect to a lawyer if needed.",
      cta: "Start Free Legal Chat",
      href: "/ai-assistant",
      color: "emerald",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "I Am a Lawyer",
      description: "Receive client leads. Access AI-powered legal insights. Grow your digital practice with low subscription.",
      cta: "Join as Lawyer",
      href: "/for-lawyers",
      color: "gold",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "I Am a Partner",
      description: "Support the Justice Wallet. Partner with us for pilots, research, and legal aid programs.",
      cta: "Explore Partnerships",
      href: "/for-ngos",
      color: "silver",
    },
  ];

  const howItWorks = [
    { step: "01", title: "Ask Your Question", description: "Tell Justice AI about your legal concern in plain language" },
    { step: "02", title: "Get Clear Guidance", description: "Receive rights-based guidance and suggested next steps" },
    { step: "03", title: "Download Templates", description: "Access relevant legal document templates if needed" },
    { step: "04", title: "Connect to Lawyer", description: "Book a consultation with a verified lawyer if necessary" },
  ];

  const trustPartners = [
    "University of Edinburgh",
    "Politecnico di Milano",
    "Nigerian Bar Association",
    "African Legal Network",
    "Open Justice Initiative",
  ];

  return (
    <main className="flex-1" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" data-testid="hero-section">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1758519290830-5462f4924bb5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGF3eWVyJTIwY29uc3VsdGluZyUyMGNsaWVudCUyMG1vZGVybiUyMG9mZmljZXxlbnwwfHx8fDE3NzM0OTEwNzd8MA&ixlib=rb-4.1.0&q=85"
            alt="Justice consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#047A6C]/95 via-[#047A6C]/85 to-[#0A0A0A]/80"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#E5C67A]" />
              <span className="text-white/90 text-sm font-medium">AI-Powered Legal Guidance</span>
            </div>
            
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="hero-title">
              Justice for Everyone.
              <span className="block text-[#E5C67A]">Designed for Humanity.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              AccessJustice.Global uses AI to provide free legal guidance, affordable lawyer access, 
              and justice support funding for people everywhere.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/ai-assistant">
                <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100 px-8 py-6 text-base font-semibold" data-testid="hero-cta-help">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  I Need Legal Help
                </Button>
              </Link>
              <Link to="/for-lawyers">
                <Button size="lg" variant="outline" className="border-[#E5C67A] text-[#E5C67A] hover:bg-[#E5C67A] hover:text-[#0A0A0A] px-8 py-6 text-base font-semibold" data-testid="hero-cta-lawyer">
                  <Briefcase className="w-5 h-5 mr-2" />
                  I Am a Lawyer
                </Button>
              </Link>
              <Link to="/for-ngos">
                <Button size="lg" variant="ghost" className="text-white hover:bg-white/10 px-8 py-6 text-base font-semibold" data-testid="hero-cta-partner">
                  <Heart className="w-5 h-5 mr-2" />
                  I Am a Partner
                </Button>
              </Link>
            </div>

            {/* Video Placeholder */}
            <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl p-6 max-w-md border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#E5C67A] rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 text-[#0A0A0A] ml-1" />
                </div>
                <div>
                  <p className="text-white font-medium">Watch How It Works</p>
                  <p className="text-white/60 text-sm">90 second explainer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Primary Paths Section */}
      <section className="py-16 lg:py-24 bg-white" data-testid="paths-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-4">
              How Can We Help You?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              AccessJustice.Global serves citizens, legal professionals, and partners committed to justice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pathCards.map((card, index) => (
              <Card 
                key={index} 
                className={`group relative overflow-hidden border-t-4 ${
                  card.color === "emerald" ? "border-t-[#047A6C]" : 
                  card.color === "gold" ? "border-t-[#E5C67A]" : "border-t-[#C9D1D9]"
                } hover:shadow-xl transition-all duration-300`}
                data-testid={`path-card-${index}`}
              >
                <CardContent className="p-6 lg:p-8">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                    card.color === "emerald" ? "bg-[#E0F2F1] text-[#047A6C]" :
                    card.color === "gold" ? "bg-[#F9F3E5] text-[#856404]" : "bg-gray-100 text-gray-600"
                  }`}>
                    {card.icon}
                  </div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0A0A0A] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  <Link to={card.href}>
                    <Button 
                      className={`w-full ${
                        card.color === "emerald" ? "bg-[#047A6C] hover:bg-[#036459]" :
                        card.color === "gold" ? "bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]" :
                        "bg-gray-800 hover:bg-gray-700"
                      }`}
                      data-testid={`path-cta-${index}`}
                    >
                      {card.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Strip */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]" data-testid="how-it-works-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-12">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-2">
                How It Works
              </h2>
              <p className="text-gray-600">Four simple steps to access justice</p>
            </div>
            <Link to="/how-it-works" className="mt-4 lg:mt-0">
              <Button variant="outline" className="border-[#047A6C] text-[#047A6C] hover:bg-[#047A6C] hover:text-white" data-testid="see-how-btn">
                See Full Guide <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="relative" data-testid={`step-${index}`}>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                  <span className="font-['Playfair_Display'] text-4xl font-bold text-[#E5C67A]/30">{item.step}</span>
                  <h3 className="font-semibold text-[#0A0A0A] mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-[#C9D1D9]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Partners Section */}
      <section className="py-12 bg-white border-y border-gray-100" data-testid="partners-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-6">
            Developed in collaboration with legal experts, AI researchers, and justice advocates
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {trustPartners.map((partner, index) => (
              <div key={index} className="text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Justice Wallet Highlight */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#F9F3E5] to-white" data-testid="justice-wallet-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E5C67A]/20 rounded-full px-4 py-2 mb-6">
                <Wallet className="w-4 h-4 text-[#856404]" />
                <span className="text-[#856404] text-sm font-medium">Justice Wallet</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-4">
                When You Can't Afford a Lawyer
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                If you cannot afford legal help, the Justice Wallet can cover part or all of the cost, 
                funded by NGOs, donors, and partners committed to equal access to justice.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Apply for subsidized legal support",
                  "Transparent funding and impact tracking",
                  "Verified lawyers committed to pro-bono work"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#047A6C] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-legal-help">
                  <Button className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]" data-testid="wallet-apply-btn">
                    Apply for Justice Wallet
                  </Button>
                </Link>
                <Link to="/for-ngos">
                  <Button variant="outline" className="border-[#047A6C] text-[#047A6C] hover:bg-[#047A6C] hover:text-white" data-testid="wallet-fund-btn">
                    Fund the Justice Wallet
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#E5C67A] rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-[#0A0A0A]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0A0A0A]">Justice Wallet Fund</h4>
                    <p className="text-gray-500 text-sm">Supporting access to justice</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="text-gray-600">Cases Funded</span>
                    <span className="font-bold text-[#047A6C]">234+</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="text-gray-600">Donors</span>
                    <span className="font-bold text-[#047A6C]">45+</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#F8FAFC] rounded-lg">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-bold text-[#047A6C]">89%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Stats Section */}
      <section className="py-16 lg:py-24 bg-[#0A0A0A]" data-testid="impact-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white mb-4">
              Making Justice Accessible
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our impact in numbers, growing every day
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {[
              { icon: <Users className="w-6 h-6" />, value: stats.users_helped.toLocaleString() + "+", label: "Users Helped" },
              { icon: <MessageSquare className="w-6 h-6" />, value: stats.legal_questions_answered.toLocaleString() + "+", label: "Questions Answered" },
              { icon: <FileText className="w-6 h-6" />, value: stats.templates_available + "+", label: "Templates Available" },
              { icon: <Award className="w-6 h-6" />, value: stats.verified_lawyers + "+", label: "Verified Lawyers" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-xl border border-white/10" data-testid={`stat-${index}`}>
                <div className="w-12 h-12 bg-[#047A6C] rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <p className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "The AI helped me understand my tenant rights when my landlord tried to evict me unfairly. I downloaded the right template and resolved the issue without expensive legal fees.",
                author: "Sarah M.",
                role: "Lagos, Nigeria"
              },
              {
                quote: "As a lawyer, this platform has connected me with clients who truly need help. The AI pre-screens cases, so I can focus on providing real value.",
                author: "Barrister Adewale O.",
                role: "Legal Practitioner"
              },
              {
                quote: "Our NGO partners with AccessJustice to scale our legal aid programs. The impact tracking and cost efficiency are remarkable.",
                author: "Maria C.",
                role: "NGO Director"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10" data-testid={`testimonial-${index}`}>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-[#047A6C]" data-testid="final-cta-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Access Justice?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you need legal guidance, want to offer your legal expertise, or wish to support 
            access to justice, we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100 px-8" data-testid="final-cta-chat">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Free Legal Chat
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#047A6C] px-8" data-testid="final-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
