import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth, API } from "../App";
import axios from "axios";
import {
  MessageSquare,
  FileText,
  Users,
  Wallet,
  Briefcase,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle2,
  Scale,
  TrendingUp,
} from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [walletApplications, setWalletApplications] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, walletRes] = await Promise.all([
        axios.get(`${API}/stats`),
        axios.get(`${API}/justice-wallet/my-applications`, { withCredentials: true }).catch(() => ({ data: { applications: [] } })),
      ]);
      setStats(statsRes.data);
      setWalletApplications(walletRes.data.applications);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  };

  const citizenCards = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI Legal Assistant",
      description: "Get free legal guidance on your questions",
      href: "/ai-assistant",
      color: "emerald",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Legal Templates",
      description: "Download free legal document templates",
      href: "/get-legal-help#templates",
      color: "blue",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Find a Lawyer",
      description: "Connect with verified legal professionals",
      href: "/get-legal-help",
      color: "purple",
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Justice Wallet",
      description: "Apply for financial assistance",
      href: "/get-legal-help",
      color: "gold",
    },
  ];

  const lawyerCards = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Referrals",
      description: "View and manage client requests",
      href: "#",
      color: "emerald",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "AI Case Tools",
      description: "Access AI-powered legal research",
      href: "/ai-assistant",
      color: "blue",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Profile Settings",
      description: "Update your lawyer profile",
      href: "#",
      color: "gray",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: "bg-[#E0F2F1] text-[#047A6C]",
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      gold: "bg-[#F9F3E5] text-[#856404]",
      gray: "bg-gray-100 text-gray-600",
    };
    return colors[color] || colors.emerald;
  };

  const quickActions = user?.role === "lawyer" ? lawyerCards : citizenCards;

  return (
    <main className="flex-1 bg-[#F8FAFC] py-8" data-testid="dashboard-page">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#0A0A0A] mb-2">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-gray-600">
            {user?.role === "lawyer" 
              ? "Manage your practice and connect with clients" 
              : "Access legal help and resources"}
          </p>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Users Helped", value: stats.users_helped?.toLocaleString() || "0" },
              { label: "Questions Answered", value: stats.legal_questions_answered?.toLocaleString() || "0" },
              { label: "Templates", value: stats.templates_available || "0" },
              { label: "Verified Lawyers", value: stats.verified_lawyers || "0" },
            ].map((stat, index) => (
              <Card key={index} className="border-none shadow-sm" data-testid={`dashboard-stat-${index}`}>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-[#047A6C]">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-[#0A0A0A] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((card, index) => (
                <Link key={index} to={card.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer h-full" data-testid={`quick-action-${index}`}>
                    <CardContent className="p-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${getColorClasses(card.color)}`}>
                        {card.icon}
                      </div>
                      <h3 className="font-semibold text-[#0A0A0A] mb-1">{card.title}</h3>
                      <p className="text-gray-600 text-sm">{card.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card data-testid="profile-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#047A6C] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0A0A0A]">{user?.name}</p>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#E0F2F1] text-[#047A6C] capitalize mt-1">
                      {user?.role}
                    </span>
                  </div>
                </div>
                {user?.role === "lawyer" && (
                  <Button variant="outline" className="w-full mb-2" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
                <Button variant="ghost" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700" size="sm" onClick={logout} data-testid="dashboard-logout-btn">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>

            {/* Justice Wallet Applications */}
            {walletApplications.length > 0 && (
              <Card data-testid="wallet-applications-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-[#E5C67A]" />
                    Your Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {walletApplications.slice(0, 3).map((app, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-[#0A0A0A] truncate max-w-[150px]">
                            {app.case_description?.substring(0, 30)}...
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          app.status === "pending" 
                            ? "bg-yellow-100 text-yellow-700" 
                            : app.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {app.status === "pending" ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Need Help Card */}
            <Card className="bg-[#047A6C] text-white" data-testid="help-card">
              <CardContent className="p-5">
                <Scale className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-2">Need Legal Help?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Our AI assistant is available 24/7 to answer your legal questions.
                </p>
                <Link to="/ai-assistant">
                  <Button className="w-full bg-white text-[#047A6C] hover:bg-gray-100" size="sm" data-testid="help-chat-btn">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
