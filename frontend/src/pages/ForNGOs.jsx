import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../App";
import {
  Heart,
  Globe2,
  TrendingUp,
  BarChart3,
  Users,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Building2,
  FileText,
  Shield,
  Target,
  Award,
  HandHeart,
} from "lucide-react";

const ForNGOs = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    submission_type: "partnership",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Partnership inquiry submitted! We'll be in touch soon.");
      setFormData({ name: "", email: "", organization: "", message: "", submission_type: "partnership" });
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnershipTypes = [
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Fund the Justice Wallet",
      description: "Contribute to the Justice Wallet to subsidize legal services for those who cannot afford them."
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Regional Pilots",
      description: "Host pilot programs in your region with localized legal content and partner lawyers."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Research Collaboration",
      description: "Partner on responsible AI research for access-to-justice applications."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Capacity Building",
      description: "Train lawyers, paralegals, and community organizations on using legal tech."
    },
  ];

  const impactMetrics = [
    { value: "234+", label: "Cases Funded" },
    { value: "89%", label: "Success Rate" },
    { value: "45+", label: "Partner Organizations" },
    { value: "$12", label: "Avg. Cost Per Case" },
  ];

  return (
    <main className="flex-1" data-testid="for-ngos-page">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden" data-testid="ngo-hero">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1591672366177-3b6119b143ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxkaXZlcnNlJTIwZ2xvYmFsJTIwY29tbXVuaXR5JTIwanVzdGljZSUyMGdhdGhlcmluZ3xlbnwwfHx8fDE3NzM0OTEwNzh8MA&ixlib=rb-4.1.0&q=85"
            alt="Community justice"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#E5C67A]/20 rounded-full px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-[#E5C67A]" />
              <span className="text-[#E5C67A] text-sm font-medium">Partners in Justice</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              Scale Your Impact with
              <span className="block text-[#E5C67A]">Technology & Partnership</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Partner with AccessJustice.Global to reach more beneficiaries, reduce cost per case, 
              and track impact with transparent reporting.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]"
                onClick={() => setShowForm(true)}
                data-testid="partner-btn"
              >
                <HandHeart className="w-5 h-5 mr-2" />
                Partner With Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#0A0A0A]"
                onClick={() => document.getElementById('wallet').scrollIntoView({ behavior: 'smooth' })}
                data-testid="fund-wallet-btn"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Fund the Justice Wallet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white border-b border-gray-100" data-testid="impact-stats">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center" data-testid={`metric-${index}`}>
                <p className="text-4xl font-bold text-[#047A6C]">{metric.value}</p>
                <p className="text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Justice Wallet Section */}
      <section id="wallet" className="py-16 lg:py-24 bg-gradient-to-br from-[#F9F3E5] to-white" data-testid="wallet-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E5C67A]/20 rounded-full px-4 py-2 mb-6">
                <Wallet className="w-4 h-4 text-[#856404]" />
                <span className="text-[#856404] text-sm font-medium">Justice Wallet</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                Fund Access to Justice
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The Justice Wallet is a subsidy fund that covers legal consultation fees for people who 
                cannot afford them. Your contribution directly enables access to justice for underserved communities.
              </p>
              
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-[#0A0A0A]">What Your Funding Provides:</h4>
                <ul className="space-y-3">
                  {[
                    "Subsidized legal consultations with verified lawyers",
                    "Free AI-powered legal guidance for unlimited users",
                    "Legal document templates and resources",
                    "Training for community paralegals",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#047A6C] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]"
                onClick={() => setShowForm(true)}
                data-testid="contribute-btn"
              >
                Contribute to Justice Wallet
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#0A0A0A] mb-6 text-center">
                Donor Impact Dashboard
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Total Funds Raised</span>
                    <span className="font-bold text-[#047A6C]">$45,000</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-[#047A6C] rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F8FAFC] rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#047A6C]">234</p>
                    <p className="text-gray-600 text-sm">Cases Funded</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#047A6C]">12</p>
                    <p className="text-gray-600 text-sm">Countries Reached</p>
                  </div>
                </div>
                <div className="p-4 bg-[#E0F2F1] rounded-lg">
                  <p className="text-sm text-[#047A6C] font-medium">
                    "Every $12 funds one complete legal consultation for someone in need."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 lg:py-24 bg-white" data-testid="partnership-types">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Multiple ways to collaborate and scale access to justice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnershipTypes.map((type, index) => (
              <Card key={index} className="border-l-4 border-l-[#047A6C] hover:shadow-lg transition-shadow" data-testid={`partnership-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#E0F2F1] text-[#047A6C] rounded-xl flex items-center justify-center flex-shrink-0">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#0A0A0A] text-lg mb-2">{type.title}</h3>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting & Transparency */}
      <section className="py-16 bg-[#F8FAFC]" data-testid="reporting-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <BarChart3 className="w-12 h-12 text-[#047A6C] mx-auto mb-4" />
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              Transparent Impact Reporting
            </h2>
            <p className="text-gray-600 mb-8">
              All partners receive detailed quarterly reports including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: <Users className="w-5 h-5" />, label: "Beneficiaries Served" },
                { icon: <FileText className="w-5 h-5" />, label: "Case Types & Outcomes" },
                { icon: <Globe2 className="w-5 h-5" />, label: "Geographic Distribution" },
                { icon: <TrendingUp className="w-5 h-5" />, label: "Cost Per Case Metrics" },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-10 h-10 bg-[#E0F2F1] text-[#047A6C] rounded-lg flex items-center justify-center mx-auto mb-2">
                    {item.icon}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="partnership-modal">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#047A6C]" />
                Partnership Inquiry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="partner-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="partner-email-input"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    required
                    data-testid="partner-org-input"
                  />
                </div>
                <div>
                  <Label htmlFor="message">How would you like to partner? *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                    data-testid="partner-message-textarea"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#047A6C] hover:bg-[#036459]" disabled={isSubmitting} data-testid="partner-submit-btn">
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#047A6C]" data-testid="ngo-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Ready to Make Justice Accessible?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join our network of partners committed to making legal help available to everyone.
          </p>
          <Button 
            size="lg" 
            className="bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]"
            onClick={() => setShowForm(true)}
            data-testid="final-partner-btn"
          >
            <Heart className="w-5 h-5 mr-2" />
            Become a Partner
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ForNGOs;
