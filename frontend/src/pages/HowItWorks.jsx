import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  MessageSquare,
  FileText,
  Users,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Shield,
  Bot,
  Scale,
  ChevronRight,
} from "lucide-react";

const HowItWorks = () => {
  const citizenSteps = [
    {
      step: "01",
      title: "Ask Your Question",
      description: "Visit our AI Legal Assistant and describe your legal concern in plain language. No legal jargon required.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "Get Clear Guidance",
      description: "Justice AI analyzes your question and provides clear, understandable information about your rights and options.",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Download Templates",
      description: "If your situation requires documentation, download relevant legal templates to help you take action.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      step: "04",
      title: "Connect to a Lawyer",
      description: "If you need professional legal help, connect with a verified lawyer. Apply for Justice Wallet support if needed.",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const lawyerSteps = [
    {
      step: "01",
      title: "Sign Up & Verify",
      description: "Create an account and verify your bar membership and credentials."
    },
    {
      step: "02",
      title: "Set Up Your Profile",
      description: "Choose your practice areas, set consultation rates, and complete your profile."
    },
    {
      step: "03",
      title: "Receive Referrals",
      description: "Get notifications when citizens in your practice areas need consultation."
    },
    {
      step: "04",
      title: "Consult & Get Paid",
      description: "Conduct consultations and receive payments through the platform."
    },
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Private & Secure",
      description: "All conversations are encrypted and confidential"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legally Informed",
      description: "AI trained on extensive legal databases"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Financial Support",
      description: "Justice Wallet for those who can't afford help"
    },
  ];

  return (
    <main className="flex-1" data-testid="how-it-works-page">
      {/* Hero Section */}
      <section className="bg-[#047A6C] py-16 lg:py-24" data-testid="how-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              How AccessJustice Works
            </h1>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Simple steps to access legal guidance, connect with lawyers, and get the help you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/ai-assistant">
                <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100" data-testid="start-now-btn">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Free Legal Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* For Citizens */}
      <section className="py-16 lg:py-24 bg-white" data-testid="citizen-steps">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#E0F2F1] rounded-full px-4 py-2 mb-4">
              <Users className="w-4 h-4 text-[#047A6C]" />
              <span className="text-[#047A6C] text-sm font-medium">For Citizens</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              Four Steps to Legal Help
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Getting legal guidance has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {citizenSteps.map((step, index) => (
              <div key={index} className="relative" data-testid={`citizen-step-${index}`}>
                <Card className="h-full border-t-4 border-t-[#047A6C]">
                  <CardContent className="p-6">
                    <span className="font-['Playfair_Display'] text-5xl font-bold text-[#047A6C]/20">
                      {step.step}
                    </span>
                    <div className="w-12 h-12 bg-[#E0F2F1] text-[#047A6C] rounded-xl flex items-center justify-center my-4">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-[#0A0A0A] text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
                {index < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-6 h-6 text-[#C9D1D9]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ai-assistant">
              <Button className="bg-[#047A6C] hover:bg-[#036459]" data-testid="citizen-cta">
                Start Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-[#F8FAFC]" data-testid="features-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100" data-testid={`feature-${index}`}>
                <div className="w-12 h-12 bg-[#E0F2F1] text-[#047A6C] rounded-xl flex items-center justify-center flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A0A0A] mb-1">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Lawyers */}
      <section className="py-16 lg:py-24 bg-white" data-testid="lawyer-steps">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F9F3E5] rounded-full px-4 py-2 mb-4">
                <Scale className="w-4 h-4 text-[#856404]" />
                <span className="text-[#856404] text-sm font-medium">For Lawyers</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                Grow Your Practice
              </h2>
              <p className="text-gray-600 mb-8">
                Join our network of verified lawyers and receive qualified client referrals 
                while accessing AI-powered tools to enhance your practice.
              </p>

              <div className="space-y-4">
                {lawyerSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4" data-testid={`lawyer-step-${index}`}>
                    <div className="w-8 h-8 bg-[#E5C67A] text-[#0A0A0A] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0A0A0A]">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/for-lawyers">
                  <Button className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]" data-testid="lawyer-cta">
                    Join as Lawyer <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-[#0A0A0A] rounded-2xl p-8 text-white">
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Lawyer Benefits</h3>
              <ul className="space-y-4">
                {[
                  "Receive pre-qualified client leads",
                  "Access AI case analysis tools",
                  "Low monthly subscription (₦5,000 / €5)",
                  "Dashboard for managing referrals",
                  "Verified lawyer badge on profile",
                  "Priority support",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E5C67A]" />
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Justice Wallet */}
      <section className="py-16 bg-gradient-to-br from-[#F9F3E5] to-white" data-testid="wallet-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-[#E5C67A] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Wallet className="w-8 h-8 text-[#0A0A0A]" />
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              Can't Afford a Lawyer?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              The Justice Wallet provides financial support for legal consultations. 
              Funded by NGOs, donors, and partners, it helps ensure everyone can access justice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/get-legal-help">
                <Button className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]" data-testid="wallet-apply">
                  Apply for Support
                </Button>
              </Link>
              <Link to="/for-ngos">
                <Button variant="outline" className="border-[#047A6C] text-[#047A6C] hover:bg-[#047A6C] hover:text-white" data-testid="wallet-fund">
                  Fund the Justice Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#047A6C]" data-testid="how-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Our AI legal assistant is available 24/7. Start your journey to understanding your rights today.
          </p>
          <Link to="/ai-assistant">
            <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100" data-testid="final-how-cta">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Free Legal Chat
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;
