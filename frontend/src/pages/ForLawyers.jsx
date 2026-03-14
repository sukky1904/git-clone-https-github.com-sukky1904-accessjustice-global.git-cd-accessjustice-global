import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { toast } from "sonner";
import axios from "axios";
import { API, useAuth } from "../App";
import {
  Briefcase,
  Users,
  TrendingUp,
  Bot,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  DollarSign,
  Award,
  FileText,
  MessageSquare,
  BarChart3,
  Globe2,
} from "lucide-react";

const ForLawyers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = useState(false);
  const [formData, setFormData] = useState({
    bar_number: "",
    practice_areas: [],
    bio: "",
    phone: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const practiceAreas = [
    "Family Law",
    "Criminal Law",
    "Corporate Law",
    "Real Estate",
    "Immigration",
    "Employment Law",
    "Personal Injury",
    "Intellectual Property",
    "Tax Law",
    "Environmental Law",
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Qualified Client Leads",
      description: "Receive referrals from citizens who have already used our AI to understand their legal needs. Better-qualified leads mean more efficient consultations."
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI-Powered Tools",
      description: "Access case analysis tools, legal research assistance, and document drafting support powered by advanced AI technology."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Grow Your Practice",
      description: "Expand your digital presence and reach clients who need your expertise but might not find you through traditional channels."
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Affordable Subscription",
      description: "Join for just ₦5,000 / €5 per month. Low barrier to entry with high potential for quality client connections."
    },
  ];

  const aiTools = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Case Summarization",
      description: "AI analyzes case documents and provides concise summaries"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Judgment Predictions",
      description: "Get likely outcome scenarios based on similar cases"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Legal Research",
      description: "Search relevant laws, precedents, and judgments instantly"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Draft Assistance",
      description: "Generate draft opinions and legal documents quickly"
    },
  ];

  const handleAreaToggle = (area) => {
    setFormData((prev) => ({
      ...prev,
      practice_areas: prev.practice_areas.includes(area)
        ? prev.practice_areas.filter((a) => a !== area)
        : [...prev.practice_areas, area],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login first to register as a lawyer");
      navigate("/login", { state: { from: "/for-lawyers" } });
      return;
    }

    if (formData.practice_areas.length === 0) {
      toast.error("Please select at least one practice area");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/lawyers/register`, formData, { withCredentials: true });
      toast.success("Registration submitted! Your profile is pending verification.");
      setShowRegistration(false);
      navigate("/dashboard");
    } catch (error) {
      const message = error.response?.data?.detail || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1" data-testid="for-lawyers-page">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden" data-testid="lawyer-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#1F2937]"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E5C67A] rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#047A6C] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#E5C67A]/20 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4 text-[#E5C67A]" />
              <span className="text-[#E5C67A] text-sm font-medium">For Legal Professionals</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              Grow Your Practice with
              <span className="block text-[#E5C67A]">AI-Powered Tools</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Join AccessJustice.Global to receive qualified client leads, access cutting-edge AI tools 
              for case analysis, and expand your digital practice—all for a low monthly subscription.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]"
                onClick={() => setShowRegistration(true)}
                data-testid="join-btn"
              >
                <Briefcase className="w-5 h-5 mr-2" />
                Join as Lawyer
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#0A0A0A]"
                onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
                data-testid="learn-more-btn"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 lg:py-24 bg-white" data-testid="benefits-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-[#0A0A0A] mb-4">
              Why Join AccessJustice.Global?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We connect you with clients who need your expertise while providing powerful tools to enhance your practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-l-4 border-l-[#E5C67A] hover:shadow-lg transition-shadow" data-testid={`benefit-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F9F3E5] text-[#856404] rounded-xl flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A0A0A] text-lg mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]" data-testid="ai-tools-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E0F2F1] rounded-full px-4 py-2 mb-6">
                <Bot className="w-4 h-4 text-[#047A6C]" />
                <span className="text-[#047A6C] text-sm font-medium">AI-Powered</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                AI Tools to Enhance Your Practice
              </h2>
              <p className="text-gray-600 mb-6">
                Our AI tools help you work more efficiently—you remain fully responsible for all legal advice 
                and decisions, but our technology assists with research, analysis, and drafting.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiTools.map((tool, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-100" data-testid={`ai-tool-${index}`}>
                    <div className="w-10 h-10 bg-[#E0F2F1] text-[#047A6C] rounded-lg flex items-center justify-center flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0A0A0A] text-sm">{tool.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#0A0A0A] mb-2">
                  Subscription Plan
                </h3>
                <p className="text-gray-600">Simple, affordable pricing</p>
              </div>
              
              <div className="text-center py-8 border-y border-gray-100 mb-6">
                <p className="text-5xl font-bold text-[#047A6C]">
                  ₦5,000<span className="text-xl font-normal text-gray-400">/mo</span>
                </p>
                <p className="text-gray-500 mt-2">or €5/month</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Verified lawyer badge on your profile",
                  "Receive qualified client referrals",
                  "Access to AI case analysis tools",
                  "Dashboard for managing leads",
                  "Priority support",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#047A6C]" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full bg-[#047A6C] hover:bg-[#036459]" 
                size="lg"
                onClick={() => setShowRegistration(true)}
                data-testid="subscribe-btn"
              >
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How You Get Paid */}
      <section className="py-16 bg-white" data-testid="payment-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              How You Get Paid
            </h2>
            <p className="text-gray-600 mb-8">
              Transparent payment process for your consultations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Set Your Rates", description: "Define your consultation fees for different service types" },
                { step: "2", title: "Client Books", description: "Citizens book consultations through the platform" },
                { step: "3", title: "Get Paid", description: "Receive payments directly after consultations" },
              ].map((item, index) => (
                <div key={index} className="p-6 bg-[#F8FAFC] rounded-xl" data-testid={`payment-step-${index}`}>
                  <div className="w-10 h-10 bg-[#E5C67A] text-[#0A0A0A] rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-[#0A0A0A] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ethics Section */}
      <section className="py-16 bg-[#0A0A0A]" data-testid="ethics-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-12 h-12 text-[#E5C67A] mx-auto mb-4" />
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
              Ethics & Professional Responsibility
            </h2>
            <p className="text-gray-400 mb-8">
              We take professional responsibility seriously. All lawyers on our platform must:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                "Maintain valid bar membership and good standing",
                "Adhere to all applicable rules of professional conduct",
                "Provide accurate information about qualifications",
                "Maintain client confidentiality at all times",
                "Use AI tools as assistance, not replacement for judgment",
                "Report any conflicts of interest promptly",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#047A6C] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal/Section */}
      {showRegistration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="registration-modal">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#047A6C]" />
                Become a Verified Lawyer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!user ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Please login or create an account first</p>
                  <div className="flex gap-4 justify-center">
                    <Link to="/login">
                      <Button className="bg-[#047A6C] hover:bg-[#036459]">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="outline">Create Account</Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="bar_number">Bar Number / Enrollment ID *</Label>
                    <Input
                      id="bar_number"
                      value={formData.bar_number}
                      onChange={(e) => setFormData({ ...formData, bar_number: e.target.value })}
                      placeholder="Enter your bar enrollment number"
                      required
                      data-testid="bar-number-input"
                    />
                  </div>

                  <div>
                    <Label>Practice Areas *</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {practiceAreas.map((area) => (
                        <div key={area} className="flex items-center gap-2">
                          <Checkbox
                            id={area}
                            checked={formData.practice_areas.includes(area)}
                            onCheckedChange={() => handleAreaToggle(area)}
                            data-testid={`area-${area}`}
                          />
                          <Label htmlFor={area} className="text-sm font-normal cursor-pointer">
                            {area}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Professional Bio *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell potential clients about your experience..."
                      rows={4}
                      required
                      data-testid="bio-textarea"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234..."
                      required
                      data-testid="phone-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Country"
                      required
                      data-testid="location-input"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowRegistration(false)}
                      data-testid="cancel-btn"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-[#047A6C] hover:bg-[#036459]"
                      disabled={isSubmitting}
                      data-testid="submit-registration-btn"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-[#047A6C]" data-testid="lawyer-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Ready to Expand Your Practice?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join hundreds of lawyers already using AccessJustice.Global to connect with clients and grow their digital presence.
          </p>
          <Button 
            size="lg" 
            className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]"
            onClick={() => setShowRegistration(true)}
            data-testid="final-join-btn"
          >
            <Briefcase className="w-5 h-5 mr-2" />
            Become a Verified Lawyer
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ForLawyers;
