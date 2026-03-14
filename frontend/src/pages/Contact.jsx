import { useState } from "react";
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
import { API } from "../App";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  HelpCircle,
  Users,
  Briefcase,
  Building2,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
    submission_type: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        organization: "",
        message: "",
        submission_type: "general",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "info@accessjustice.global",
      description: "For general inquiries",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      value: "Available 24/7",
      description: "Use our AI Assistant",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Global",
      value: "Worldwide Operations",
      description: "Serving communities globally",
    },
  ];

  const faqCategories = {
    citizens: {
      title: "For Citizens",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          q: "How do I get started with Justice AI?",
          a: "Simply click 'Get Legal Help' and start typing your question. Our AI will guide you through understanding your rights and available options."
        },
        {
          q: "Is my conversation with Justice AI confidential?",
          a: "Yes, all conversations are encrypted and confidential. We do not share your data with third parties without your explicit consent."
        },
        {
          q: "Can Justice AI replace a real lawyer?",
          a: "No. Justice AI provides general legal information to help you understand your situation. For specific legal advice and representation, you should consult with a qualified lawyer."
        },
        {
          q: "How do I apply for Justice Wallet support?",
          a: "Go to 'Get Legal Help' page and scroll down to the Justice Wallet section. Fill out the application form with your details and legal need description."
        },
      ],
    },
    lawyers: {
      title: "For Lawyers",
      icon: <Briefcase className="w-5 h-5" />,
      questions: [
        {
          q: "What are the requirements to join?",
          a: "You must be a licensed attorney with valid bar membership in good standing. You'll need to provide your bar number and verify your credentials."
        },
        {
          q: "How much does the subscription cost?",
          a: "The monthly subscription is ₦5,000 (approximately €5). This gives you access to client referrals, AI tools, and a verified lawyer badge."
        },
        {
          q: "How do I receive client referrals?",
          a: "Once verified, you'll receive notifications when citizens in your practice areas need consultation. You can accept or decline referrals through your dashboard."
        },
        {
          q: "Can I use the AI tools for my existing clients?",
          a: "Yes, you can use our AI research and analysis tools for any of your cases, not just platform referrals."
        },
      ],
    },
    partners: {
      title: "For Partners & NGOs",
      icon: <Building2 className="w-5 h-5" />,
      questions: [
        {
          q: "How can my organization partner with AccessJustice?",
          a: "We offer various partnership models including Justice Wallet funding, regional pilots, research collaborations, and capacity building. Contact us to discuss options."
        },
        {
          q: "What reporting do Justice Wallet donors receive?",
          a: "Donors receive quarterly impact reports showing number of cases supported, types of legal issues addressed, geographic distribution, and outcome metrics."
        },
        {
          q: "Can we customize the platform for our region?",
          a: "Yes, we can work with partners to localize the platform with region-specific legal information, languages, and partner lawyer networks."
        },
      ],
    },
  };

  return (
    <main className="flex-1" data-testid="contact-page">
      {/* Hero Section */}
      <section className="bg-[#047A6C] py-16" data-testid="contact-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-white/90">
              Have questions or want to partner with us? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-white border-b border-gray-100" data-testid="contact-methods">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-xl" data-testid={`contact-method-${index}`}>
                <div className="w-12 h-12 bg-[#E0F2F1] text-[#047A6C] rounded-xl flex items-center justify-center flex-shrink-0">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A0A0A]">{method.title}</h3>
                  <p className="text-[#047A6C] font-medium">{method.value}</p>
                  <p className="text-gray-500 text-sm">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16 bg-[#F8FAFC]" data-testid="contact-form-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0A0A0A] mb-6">
                Send Us a Message
              </h2>
              <Card data-testid="contact-form-card">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        data-testid="contact-email-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization (Optional)</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        data-testid="contact-org-input"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Inquiry Type</Label>
                      <Select value={formData.submission_type} onValueChange={(value) => setFormData({ ...formData, submission_type: value })}>
                        <SelectTrigger data-testid="contact-type-select">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="lawyer_inquiry">Lawyer Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        data-testid="contact-message-textarea"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-[#047A6C] hover:bg-[#036459]" disabled={isSubmitting} data-testid="contact-submit-btn">
                      {isSubmitting ? "Sending..." : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0A0A0A] mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <Card key={key} data-testid={`faq-${key}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <span className="text-[#047A6C]">{category.icon}</span>
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        {category.questions.map((faq, index) => (
                          <AccordionItem key={index} value={`${key}-${index}`}>
                            <AccordionTrigger className="text-left text-sm font-medium">
                              {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 text-sm">
                              {faq.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
