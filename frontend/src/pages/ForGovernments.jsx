import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { API } from "../App";
import {
  Building,
  Globe2,
  BarChart3,
  Shield,
  Scale,
  CheckCircle2,
  FileText,
  Users,
  TrendingUp,
  Target,
  BookOpen,
  Gavel,
} from "lucide-react";

const ForGovernments = () => {
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
      toast.success("Inquiry submitted! We'll be in touch soon.");
      setFormData({ name: "", email: "", organization: "", message: "", submission_type: "partnership" });
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sdgAlignment = [
    {
      number: "16.3",
      title: "Rule of Law",
      description: "Promote the rule of law and ensure equal access to justice for all"
    },
    {
      number: "16.6",
      title: "Effective Institutions",
      description: "Develop effective, accountable, and transparent institutions"
    },
    {
      number: "16.10",
      title: "Public Access",
      description: "Ensure public access to information and protect fundamental freedoms"
    },
  ];

  const policyFeatures = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Access-to-Justice Dashboards",
      description: "Real-time data on legal issues faced by citizens, geographic distribution, and resolution rates."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Trend Analysis",
      description: "Identify emerging legal issues, seasonal patterns, and areas requiring policy intervention."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Demographic Insights",
      description: "Understand which communities face the most legal challenges and barriers to justice."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Policy Reports",
      description: "Regular reports with actionable insights for legislative and policy development."
    },
  ];

  const barAssociationBenefits = [
    "Encourage responsible AI adoption in legal practice",
    "Support pro-bono and legal aid mandates",
    "Provide continuing legal education opportunities",
    "Expand access to legal services ethically",
    "Monitor quality of legal AI assistance",
    "Collaborate on ethical guidelines for legal tech",
  ];

  return (
    <main className="flex-1" data-testid="for-governments-page">
      {/* Hero Section */}
      <section className="bg-[#0A0A0A] py-16 lg:py-24" data-testid="gov-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#047A6C]/20 rounded-full px-4 py-2 mb-6">
              <Building className="w-4 h-4 text-[#047A6C]" />
              <span className="text-[#047A6C] text-sm font-medium">For Policy Makers</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              Data-Driven Justice
              <span className="block text-[#E5C67A]">for Better Policy</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Partner with AccessJustice.Global to gain insights into access-to-justice gaps, 
              support SDG 16 goals, and enable safe AI adoption in legal services.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#047A6C] hover:bg-[#036459]"
                onClick={() => setShowForm(true)}
                data-testid="policy-demo-btn"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Request Policy Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#E5C67A] text-[#E5C67A] hover:bg-[#E5C67A] hover:text-[#0A0A0A]"
                data-testid="download-brief-btn"
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Partnership Brief
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SDG 16 Alignment */}
      <section className="py-16 bg-white" data-testid="sdg-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#E0F2F1] rounded-full px-4 py-2 mb-4">
              <Target className="w-4 h-4 text-[#047A6C]" />
              <span className="text-[#047A6C] text-sm font-medium">UN Sustainable Development Goals</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              Supporting SDG 16: Peace, Justice & Strong Institutions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform directly contributes to multiple SDG 16 targets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sdgAlignment.map((sdg, index) => (
              <Card key={index} className="border-t-4 border-t-[#047A6C] text-center" data-testid={`sdg-${index}`}>
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-[#E0F2F1] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-[#047A6C]">{sdg.number}</span>
                  </div>
                  <h3 className="font-semibold text-[#0A0A0A] text-lg mb-2">{sdg.title}</h3>
                  <p className="text-gray-600 text-sm">{sdg.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Dashboards */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]" data-testid="dashboards-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                Policy Intelligence Dashboards
              </h2>
              <p className="text-gray-600 mb-8">
                Gain unprecedented insights into access-to-justice challenges in your jurisdiction 
                with aggregated, anonymized data from our platform.
              </p>

              <div className="space-y-4">
                {policyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4" data-testid={`policy-feature-${index}`}>
                    <div className="w-10 h-10 bg-[#E0F2F1] text-[#047A6C] rounded-lg flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0A0A0A]">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-[#0A0A0A]">Sample Dashboard View</h3>
                <span className="text-xs bg-[#E0F2F1] text-[#047A6C] px-2 py-1 rounded-full">Live Demo</span>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Top Legal Issues (This Quarter)</p>
                  <div className="space-y-2">
                    {[
                      { label: "Landlord-Tenant Disputes", pct: 32 },
                      { label: "Employment Rights", pct: 24 },
                      { label: "Consumer Protection", pct: 18 },
                      { label: "Family Law", pct: 15 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-[#047A6C] rounded-full" 
                            style={{ width: `${item.pct}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 w-24">{item.label}</span>
                        <span className="text-xs font-medium text-[#047A6C]">{item.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[#F8FAFC] rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#047A6C]">3,500+</p>
                    <p className="text-xs text-gray-500">Legal Queries</p>
                  </div>
                  <div className="p-4 bg-[#F8FAFC] rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#047A6C]">12</p>
                    <p className="text-xs text-gray-500">Regions Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Bar Associations */}
      <section className="py-16 bg-white" data-testid="bar-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Gavel className="w-12 h-12 text-[#E5C67A] mx-auto mb-4" />
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                For Bar Associations
              </h2>
              <p className="text-gray-600">
                Partner with us to support your members and advance access to justice
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {barAssociationBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg" data-testid={`bar-benefit-${index}`}>
                  <CheckCircle2 className="w-5 h-5 text-[#047A6C] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ethics & Governance */}
      <section className="py-16 bg-[#0A0A0A]" data-testid="ethics-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-12 h-12 text-[#E5C67A] mx-auto mb-4" />
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
              Ethics, Compliance & Governance
            </h2>
            <p className="text-gray-400 mb-8">
              We take responsible AI seriously. Our platform is built with:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <Shield className="w-5 h-5" />, label: "GDPR Compliance" },
                { icon: <BookOpen className="w-5 h-5" />, label: "Transparent AI Policies" },
                { icon: <Scale className="w-5 h-5" />, label: "Legal Ethics Advisory" },
                { icon: <Users className="w-5 h-5" />, label: "Data Privacy First" },
                { icon: <FileText className="w-5 h-5" />, label: "Regular Audits" },
                { icon: <Globe2 className="w-5 h-5" />, label: "Multi-Jurisdiction Support" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <span className="text-[#047A6C]">{item.icon}</span>
                  <span className="text-white text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" data-testid="gov-modal">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-[#047A6C]" />
                Government / Bar Association Inquiry
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
                    data-testid="gov-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Official Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="gov-email-input"
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Government Body / Association *</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    required
                    data-testid="gov-org-input"
                  />
                </div>
                <div>
                  <Label htmlFor="message">How can we help? *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                    data-testid="gov-message-textarea"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#047A6C] hover:bg-[#036459]" disabled={isSubmitting} data-testid="gov-submit-btn">
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-[#047A6C]" data-testid="gov-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Ready to Explore a Partnership?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Schedule a demo to see how our platform can support your access-to-justice initiatives.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#047A6C] hover:bg-gray-100"
            onClick={() => setShowForm(true)}
            data-testid="final-gov-btn"
          >
            <Building className="w-5 h-5 mr-2" />
            Request a Demo
          </Button>
        </div>
      </section>
    </main>
  );
};

export default ForGovernments;
