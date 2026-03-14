import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Scale,
  Globe2,
  Heart,
  Users,
  Target,
  Award,
  Lightbulb,
  Shield,
  Linkedin,
  Twitter,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Justice for All",
      description: "We believe legal help should be accessible to everyone, regardless of income or location."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Human-Centered",
      description: "Technology serves people. We design with empathy, clarity, and the user's dignity in mind."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Ethical AI",
      description: "We build AI responsibly, with transparency, privacy protection, and professional ethics at the core."
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      title: "Global Impact",
      description: "Starting in Africa, we're building a platform that can serve communities worldwide."
    },
  ];

  const partners = [
    "University of Edinburgh",
    "Politecnico di Milano",
    "Nigerian Bar Association",
    "African Legal Network",
    "Open Justice Initiative",
    "Legal Aid Council",
  ];

  return (
    <main className="flex-1" data-testid="about-page">
      {/* Hero Section */}
      <section className="bg-[#047A6C] py-16 lg:py-24" data-testid="about-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-white mb-6">
              About AccessJustice.Global
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              We're on a mission to transform justice from a privilege of the few into a right 
              that is accessible to everyone, especially in Africa and low-income communities globally.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white" data-testid="mission-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E0F2F1] rounded-full px-4 py-2 mb-4">
                <Target className="w-4 h-4 text-[#047A6C]" />
                <span className="text-[#047A6C] text-sm font-medium">Our Mission</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                Making Justice Accessible
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To use AI and human expertise to make justice accessible, affordable, and understandable 
                for everyone. We bridge the gap between legal systems and the people they serve, 
                empowering individuals to understand and exercise their rights.
              </p>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F9F3E5] rounded-full px-4 py-2 mb-4">
                <Lightbulb className="w-4 h-4 text-[#856404]" />
                <span className="text-[#856404] text-sm font-medium">Our Vision</span>
              </div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
                A World of Equal Justice
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where everyone can access legal guidance when they need it, 
                where lawyers can serve more people efficiently, and where justice systems 
                are informed by real data about the challenges people face.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-[#F8FAFC]" data-testid="values-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-none shadow-sm" data-testid={`value-${index}`}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-[#E0F2F1] text-[#047A6C] rounded-xl flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-[#0A0A0A] mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white" data-testid="founder-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <div className="w-40 h-40 bg-gradient-to-br from-[#047A6C] to-[#036459] rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4">
                  <span className="text-5xl font-bold text-white">SO</span>
                </div>
                <div className="flex justify-center md:justify-start gap-3">
                  <a href="#" className="text-gray-400 hover:text-[#047A6C]">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#047A6C]">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 bg-[#E5C67A]/20 rounded-full px-4 py-2 mb-4">
                  <Award className="w-4 h-4 text-[#856404]" />
                  <span className="text-[#856404] text-sm font-medium">Founder</span>
                </div>
                <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0A0A0A] mb-2">
                  Dr. Barr. Sukky Odabi
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  An innovation and strategy consultant with a legal background, Dr. Odabi brings 
                  extensive experience in digital transformation and socio-economic development. 
                  With a vision to democratize access to justice, he founded AccessJustice.Global 
                  to leverage AI technology for social good.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  His work spans across Africa and Europe, collaborating with universities, NGOs, 
                  and government institutions to build technology solutions that address fundamental 
                  access-to-justice challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Collaborators */}
      <section className="py-16 bg-[#0A0A0A]" data-testid="collaborators-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
              Global Collaboration
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Developed in collaboration with legal experts, AI researchers, and justice advocates
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="p-4 bg-white/5 rounded-lg text-center border border-white/10"
                data-testid={`partner-${index}`}
              >
                <p className="text-gray-300 text-sm font-medium">{partner}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            And many more partners across Africa, Europe, and beyond
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#047A6C]" data-testid="about-cta">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Whether you need legal help, want to offer your expertise, or wish to support 
            access to justice, there's a place for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/ai-assistant">
              <Button size="lg" className="bg-white text-[#047A6C] hover:bg-gray-100" data-testid="about-cta-help">
                Get Legal Help
              </Button>
            </Link>
            <Link to="/for-lawyers">
              <Button size="lg" variant="outline" className="border-[#E5C67A] text-[#E5C67A] hover:bg-[#E5C67A] hover:text-[#0A0A0A]" data-testid="about-cta-lawyer">
                Join as Lawyer
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10" data-testid="about-cta-contact">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
