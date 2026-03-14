import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { toast } from "sonner";
import axios from "axios";
import { API, useAuth } from "../App";
import {
  MessageSquare,
  Send,
  Scale,
  AlertTriangle,
  Home,
  Briefcase,
  Shield,
  Users,
  FileText,
  Building,
  Bot,
  User,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const AIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const topics = [
    { id: "housing", label: "Housing & Tenancy", icon: <Home className="w-4 h-4" /> },
    { id: "employment", label: "Employment", icon: <Briefcase className="w-4 h-4" /> },
    { id: "police", label: "Police & Rights", icon: <Shield className="w-4 h-4" /> },
    { id: "family", label: "Family Law", icon: <Users className="w-4 h-4" /> },
    { id: "contracts", label: "Contracts", icon: <FileText className="w-4 h-4" /> },
    { id: "business", label: "Business", icon: <Building className="w-4 h-4" /> },
  ];

  const samplePrompts = [
    "My landlord wants to evict me without notice, what can I do?",
    "I was stopped by police and I think my rights were violated.",
    "My employer hasn't paid my salary for 2 months.",
    "How do I write a simple contract for services?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        role: "assistant",
        content: `Hello! I'm Justice AI, your legal assistant. I'm here to help you understand your legal rights and options.

**Important:** I provide general legal information, not legal advice. For specific legal matters, please consult a qualified lawyer.

How can I help you today? You can:
- Ask about your legal rights
- Get guidance on legal procedures
- Learn about available legal remedies

Select a topic above or type your question below.`,
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API}/chat`,
        {
          message: userMessage,
          session_id: sessionId,
          topic: selectedTopic,
        },
        { withCredentials: true }
      );

      setSessionId(response.data.session_id);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error("Failed to get response. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again or rephrase your question.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt) => {
    setInputMessage(prompt);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    setSessionId(null);
    setSelectedTopic(null);
    setMessages([
      {
        role: "assistant",
        content: `Hello! I'm Justice AI, your legal assistant. I'm here to help you understand your legal rights and options.

**Important:** I provide general legal information, not legal advice. For specific legal matters, please consult a qualified lawyer.

How can I help you today?`,
      },
    ]);
  };

  return (
    <main className="flex-1 bg-[#F8FAFC]" data-testid="ai-assistant-page">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Disclaimer Card */}
            <Card className="border-l-4 border-l-[#E5C67A] bg-[#F9F3E5]" data-testid="disclaimer-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#856404] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-[#856404] text-sm mb-1">Important Notice</h4>
                    <p className="text-xs text-[#856404]/80">
                      Justice AI provides general legal information only. This is not legal advice and does not create an attorney-client relationship. Consult a qualified lawyer for specific legal matters.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Topic Selection */}
            <Card data-testid="topics-card">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[#0A0A0A] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#047A6C]" />
                  Select Topic
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`flex items-center gap-2 p-2 rounded-lg text-xs font-medium transition-colors ${
                        selectedTopic === topic.id
                          ? "bg-[#047A6C] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      data-testid={`topic-${topic.id}`}
                    >
                      {topic.icon}
                      <span className="truncate">{topic.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card data-testid="quick-actions-card">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[#0A0A0A] mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                    onClick={handleNewChat}
                    data-testid="new-chat-btn"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    New Conversation
                  </Button>
                  <Link to="/get-legal-help">
                    <Button variant="outline" className="w-full justify-start text-sm" data-testid="templates-btn">
                      <FileText className="w-4 h-4 mr-2" />
                      Legal Templates
                    </Button>
                  </Link>
                  {!user && (
                    <Link to="/login">
                      <Button className="w-full bg-[#047A6C] hover:bg-[#036459] text-sm" data-testid="login-save-btn">
                        <User className="w-4 h-4 mr-2" />
                        Login to Save Chats
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-12rem)] flex flex-col" data-testid="chat-card">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#047A6C] rounded-xl flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0A]">Justice AI</h3>
                    <p className="text-xs text-gray-500">
                      {selectedTopic
                        ? `Topic: ${topics.find((t) => t.id === selectedTopic)?.label}`
                        : "General Legal Guidance"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      data-testid={`message-${index}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 ${
                          message.role === "user"
                            ? "bg-[#047A6C] text-white rounded-br-sm"
                            : "bg-gray-100 text-[#0A0A0A] rounded-bl-sm"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.role === "assistant" && (
                            <Bot className="w-5 h-5 text-[#047A6C] flex-shrink-0 mt-0.5" />
                          )}
                          <div className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start" data-testid="loading-indicator">
                      <div className="bg-gray-100 rounded-2xl rounded-bl-sm p-4">
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5 text-[#047A6C]" />
                          <Loader2 className="w-4 h-4 animate-spin text-[#047A6C]" />
                          <span className="text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Sample Prompts */}
              {messages.length <= 1 && (
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {samplePrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handlePromptClick(prompt)}
                        className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full hover:bg-[#E0F2F1] hover:border-[#047A6C] hover:text-[#047A6C] transition-colors"
                        data-testid={`sample-prompt-${index}`}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about your legal rights..."
                    className="flex-1"
                    disabled={isLoading}
                    data-testid="chat-input"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-[#047A6C] hover:bg-[#036459]"
                    data-testid="send-btn"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AIAssistant;
