import { useState, useEffect } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { toast } from "sonner";
import axios from "axios";
import { API, useAuth } from "../App";
import {
  MessageSquare,
  FileText,
  Users,
  Download,
  ArrowRight,
  CheckCircle2,
  Shield,
  Wallet,
  AlertTriangle,
  Scale,
  Sparkles,
} from "lucide-react";

const GetLegalHelp = () => {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [walletForm, setWalletForm] = useState({
    name: "",
    email: "",
    case_description: "",
    income_level: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, [selectedCategory]);

  const fetchTemplates = async () => {
    try {
      const url = selectedCategory === "all" 
        ? `${API}/templates` 
        : `${API}/templates?category=${selectedCategory}`;
      const response = await axios.get(url);
      setTemplates(response.data.templates);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    }
  };

  const handleWalletSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/justice-wallet/apply`, walletForm, { withCredentials: true });
      toast.success("Application submitted successfully! We will review your request.");
      setWalletForm({ name: "", email: "", case_description: "", income_level: "" });
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "all", label: "All Templates" },
    { value: "Housing", label: "Housing & Tenancy" },
    { value: "Employment", label: "Employment" },
    { value: "Consumer Rights", label: "Consumer Rights" },
    { value: "Legal Documents", label: "Legal Documents" },
    { value: "Court Documents", label: "Court Documents" },
  ];

  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Legal Chat",
      description: "Get instant guidance on your legal questions in plain language"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Legal Templates",
      description: "Download free templates for common legal documents"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Lawyer Connection",
      description: "Connect with verified lawyers when you need professional help"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Justice Wallet",
      description: "Get financial support if you cannot afford legal help"
    },
  ];

  const faqs = [
    {
      question: "Is Justice AI really free?",
      answer: "Yes! Our AI legal assistant is completely free to use. You can ask unlimited questions and get guidance on your legal rights at no cost. Premium services like lawyer consultations may have fees, but we also offer the Justice Wallet for those who need financial assistance."
    },
    {
      question: "Is my information private?",
      answer: "Absolutely. We take your privacy seriously. Your conversations with Justice AI are encrypted and protected. We do not share your personal information or legal queries with third parties without your consent."
    },
    {
      question: "Will a real lawyer see my case?",
      answer: "Only if you choose to connect with a lawyer. The AI assistant provides general guidance, but if you decide you need professional legal help, you can opt to share your case details with a verified lawyer through our platform."
    },
    {
      question: "How accurate is the AI legal guidance?",
      answer: "Justice AI is trained on extensive legal databases and provides reliable general information. However, it's important to understand that AI guidance is not a substitute for professional legal advice. For specific legal matters, we recommend consulting with a qualified lawyer."
    },
    {
      question: "What is the Justice Wallet?",
      answer: "The Justice Wallet is a subsidy fund that helps people who cannot afford legal services. If you qualify based on your financial situation, the Justice Wallet can cover part or all of your legal consultation fees. Apply through our platform to see if you're eligible."
    },
  ];

  return (
    <main className="flex-1" data-testid="get-legal-help-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#047A6C] to-[#036459] py-16 lg:py-24" data-testid="help-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Scale className="w-4 h-4 text-[#E5C67A]" />
              <span className="text-white/90 text-sm font-medium">Free Legal Assistance</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              Get Legal Help Today
            </h1>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Our AI legal assistant helps you understand your rights, find relevant templates, 
              and connect with verified lawyers when needed. All for free.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/ai-assistant">
                <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100" data-testid="start-chat-btn">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Free Legal Chat
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#047A6C]" onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })} data-testid="browse-templates-btn">
                <FileText className="w-5 h-5 mr-2" />
                Browse Templates
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white" data-testid="features-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow" data-testid={`feature-${index}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-[#E0F2F1] text-[#047A6C] rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-[#0A0A0A] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F8FAFC]" data-testid="how-it-works">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              How to Get Legal Help
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to get the legal guidance you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Ask Your Question", description: "Tell Justice AI about your legal concern in plain language" },
              { step: "2", title: "Get Guidance", description: "Receive clear information about your rights and options" },
              { step: "3", title: "Download Templates", description: "Access relevant legal document templates if needed" },
              { step: "4", title: "Connect to Lawyer", description: "Book a consultation with a verified lawyer if necessary" },
            ].map((item, index) => (
              <div key={index} className="text-center" data-testid={`step-${index}`}>
                <div className="w-12 h-12 bg-[#047A6C] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#0A0A0A] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/ai-assistant">
              <Button className="bg-[#047A6C] hover:bg-[#036459]" data-testid="start-now-btn">
                Start Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-16 bg-white" data-testid="templates-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-2">
                Legal Templates
              </h2>
              <p className="text-gray-600">Download free templates for common legal documents</p>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px] mt-4 md:mt-0" data-testid="category-select">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
              <Card key={template.template_id} className="hover:shadow-md transition-shadow" data-testid={`template-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-[#E0F2F1] text-[#047A6C] rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#0A0A0A] mb-2">{template.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {template.download_count} downloads
                    </span>
                    <Button variant="outline" size="sm" className="text-[#047A6C] border-[#047A6C] hover:bg-[#047A6C] hover:text-white" data-testid={`download-btn-${index}`}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {templates.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No templates found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Justice Wallet Section */}
      <section className="py-16 bg-gradient-to-br from-[#F9F3E5] to-white" data-testid="wallet-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E5C67A]/20 rounded-full px-4 py-2 mb-6">
                <Wallet className="w-4 h-4 text-[#856404]" />
                <span className="text-[#856404] text-sm font-medium">Justice Wallet</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                Need Financial Help for Legal Services?
              </h2>
              <p className="text-gray-600 mb-6">
                The Justice Wallet is a subsidy fund that helps people who cannot afford legal services. 
                If you qualify, we can cover part or all of your legal consultation fees.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Funded by NGOs, donors, and corporate partners",
                  "Transparent process with clear eligibility criteria",
                  "Covers consultations with verified lawyers",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#047A6C] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card data-testid="wallet-form-card">
              <CardHeader>
                <CardTitle className="text-lg">Apply for Justice Wallet Support</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWalletSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="wallet-name">Full Name</Label>
                    <Input
                      id="wallet-name"
                      value={walletForm.name}
                      onChange={(e) => setWalletForm({ ...walletForm, name: e.target.value })}
                      required
                      data-testid="wallet-name-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wallet-email">Email Address</Label>
                    <Input
                      id="wallet-email"
                      type="email"
                      value={walletForm.email}
                      onChange={(e) => setWalletForm({ ...walletForm, email: e.target.value })}
                      required
                      data-testid="wallet-email-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="wallet-income">Income Level</Label>
                    <Select value={walletForm.income_level} onValueChange={(value) => setWalletForm({ ...walletForm, income_level: value })}>
                      <SelectTrigger data-testid="wallet-income-select">
                        <SelectValue placeholder="Select your income level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Income</SelectItem>
                        <SelectItem value="medium">Medium Income</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="wallet-case">Describe Your Legal Need</Label>
                    <Textarea
                      id="wallet-case"
                      value={walletForm.case_description}
                      onChange={(e) => setWalletForm({ ...walletForm, case_description: e.target.value })}
                      placeholder="Briefly describe your legal situation..."
                      rows={4}
                      required
                      data-testid="wallet-case-textarea"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#E5C67A] hover:bg-[#D4B365] text-[#0A0A0A]" disabled={isSubmitting} data-testid="wallet-submit-btn">
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white" data-testid="faq-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Common questions about our legal assistance services
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4" data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-[#0A0A0A] hover:text-[#047A6C]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#047A6C]" data-testid="cta-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Our AI legal assistant is available 24/7 to help you understand your rights and options.
          </p>
          <Link to="/ai-assistant">
            <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100" data-testid="final-cta-btn">
              <Sparkles className="w-5 h-5 mr-2" />
              Start Free Legal Chat Now
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default GetLegalHelp;
