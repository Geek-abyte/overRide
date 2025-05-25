import { useState, ReactNode, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { chatbotData, personalData, refreshContent } from "@/data/portfolio";

// Define types
interface PriceItem {
  service: string;
  price: string;
}

interface ChatMessage {
  from: 'user' | 'bot';
  text: string | ReactNode;
  timestamp?: number; // Making timestamp optional to fix existing code
}

// New interface for form state
interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

// Form submission state
interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

// Global state for chatbot
let globalSetIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null = null;

// Function to open chatbot from anywhere
export const openChatbot = () => {
  if (globalSetIsOpen) {
    globalSetIsOpen(true);
  }
};

// Use CMS data from portfolio with fallback to mock data
const mockTerms: string[] = chatbotData.terms || [
  "All projects require a 30% upfront deposit.",
  "Revisions are included up to 2 rounds per project.",
  "Source code is delivered upon final payment.",
  "Support is available for 30 days after delivery.",
];

const mockPrices: PriceItem[] = chatbotData.prices || [
  { service: "Landing Page", price: "$400" },
  { service: "Full Website", price: "$1200+" },
  { service: "Web App (MVP)", price: "$2000+" },
  { service: "Consultation (per hour)", price: "$50" },
];

const mockUser = {
  name: personalData.name || "Jeremiah Oladele",
  business: "BlockCraft Digital",
  email: personalData.email || "jeremiah.oladele@example.com",
};

// Define the sections for the interactive menu
enum MenuSection {
  MAIN = 'main',
  SERVICES = 'services',
  PRICING = 'pricing',
  TERMS = 'terms', 
  PAYMENT = 'payment',
  REVISIONS = 'revisions',
  PROCESS = 'process',
  CONTACT = 'contact'
}

// For specific service pricing information
interface ServiceDetail {
  name?: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}

// Use CMS data structure from content.json
interface ChatbotCmsData {
  terms: string[];
  prices: PriceItem[];
  services?: ServiceDetail[];
  paymentInfo?: {
    steps: string[];
    methods: string[];
  };
  processSteps?: {
    title: string;
    description: string;
  }[];
  revisionPolicy?: {
    standardRevisions: string;
    revisionItems: string[];
    additionalRevisions: string;
  };
  contactInfo?: {
    email: string;
    phone: string;
    responseTime: string;
  };
}

// Initial service details from CMS data
const initServiceDetails = () => {
  const servicesMap: Record<string, ServiceDetail> = {};
  
  if (chatbotData.services && chatbotData.services.length > 0) {
    chatbotData.services.forEach((service: ServiceDetail) => {
      // Use name if available, otherwise use title as the key
      const key = service.name || service.title;
      servicesMap[key] = service;
    });
    return servicesMap;
  }
  
  // Fallback service details if CMS data is not available
  return {
    "Landing Page": {
      title: "Landing Page",
      description: "A single-page website designed to convert visitors into leads or customers.",
      features: [
        "Responsive design for all devices",
        "Contact form integration",
        "SEO optimization",
        "Analytics setup",
        "2 rounds of revisions included"
      ],
      price: "$400"
    },
    "Full Website": {
      title: "Full Website",
      description: "A complete multi-page website with custom design and functionality.",
      features: [
        "Up to 5 pages of content",
        "Content Management System",
        "Mobile-responsive design",
        "SEO optimization",
        "Contact form and social media integration",
        "2 rounds of revisions included"
      ],
      price: "$1200+"
    },
    "Web App (MVP)": {
      title: "Web App (MVP)",
      description: "A functional web application with user accounts and custom functionality.",
      features: [
        "User authentication system",
        "Database integration",
        "Custom functionality based on requirements",
        "Admin panel",
        "API integrations",
        "2 rounds of revisions included"
      ],
      price: "$2000+"
    },
    "Consultation": {
      title: "Consultation",
      description: "Expert guidance on your web project, technology choices, or digital strategy.",
      features: [
        "One-on-one video call",
        "Actionable recommendations",
        "Written summary of consultation",
        "Follow-up email support",
        "Discounts on future services"
      ],
      price: "$50/hour"
    }
  };
};

// Initialize service details
const serviceDetails = initServiceDetails();

// Use payment info from CMS
const paymentInfo = chatbotData.paymentInfo || {
  steps: [
    "30% deposit to begin the project",
    "40% after initial designs/development is approved",
    "30% before final delivery of all files/code"
  ],
  methods: [
    "Bank transfer",
    "Credit card",
    "PayPal"
  ]
};

// Use process steps from CMS
const processSteps = chatbotData.processSteps || [
  {
    title: "Initial Consultation",
    description: "We'll discuss your needs, goals, and vision for the project."
  },
  {
    title: "Proposal & Timeline",
    description: "You'll receive a detailed proposal with pricing, timeline, and deliverables."
  },
  {
    title: "Design Phase",
    description: "We'll create mockups and wireframes for your review and feedback."
  },
  {
    title: "Development",
    description: "Your project will be built according to the approved designs."
  },
  {
    title: "Testing & Revisions",
    description: "We'll test everything and make revisions based on your feedback."
  },
  {
    title: "Launch & Support",
    description: "Your project goes live, with 30 days of support included."
  }
];

const TermsPricesChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<MenuSection>(MenuSection.MAIN);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [history, setHistory] = useState<MenuSection[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [cmsData, setCmsData] = useState<ChatbotCmsData>({ 
    terms: chatbotData.terms || mockTerms, 
    prices: chatbotData.prices || mockPrices,
    services: chatbotData.services || [],
    paymentInfo: chatbotData.paymentInfo || paymentInfo,
    processSteps: chatbotData.processSteps || processSteps,
    revisionPolicy: chatbotData.revisionPolicy || {
      standardRevisions: "All projects include two rounds of revisions at no additional cost.",
      revisionItems: [
        "Design adjustments within the approved concept",
        "Minor content changes",
        "Color and typography adjustments",
        "Layout refinements"
      ],
      additionalRevisions: "After the included revision rounds, additional revisions are billed at our hourly rate."
    },
    contactInfo: chatbotData.contactInfo || {
      email: personalData.email || "jeremiah.oladele@example.com",
      phone: "(123) 456-7890",
      responseTime: "We typically respond to all inquiries within 24 hours during business days."
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serviceDetailsMap, setServiceDetailsMap] = useState<Record<string, ServiceDetail>>(serviceDetails);
  const [quoteFormData, setQuoteFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });
  // State for periodic attention animation
  const [showAttentionAnimation, setShowAttentionAnimation] = useState(false);
  
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Register global state setter
  useEffect(() => {
    globalSetIsOpen = setIsOpen;
    return () => {
      globalSetIsOpen = null;
    };
  }, []);

  // Initial animation effect
  useEffect(() => {
    // Wait a bit after the page loads to grab attention with a pulse animation
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
      setIsNewMessage(true);
      // Auto-hide the pulse effect after 5 seconds
      setTimeout(() => setIsNewMessage(false), 5000);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Periodic attention-grabbing animation
  useEffect(() => {
    if (!isOpen) {
      // Initial animation after a short delay
      const initialTimer = setTimeout(() => {
        setShowAttentionAnimation(true);
        setTimeout(() => setShowAttentionAnimation(false), 3000);
      }, 5000);
      
      // Set up a periodic animation that runs every 15 seconds
      const attentionInterval = setInterval(() => {
        // Show animation for 3 seconds then hide it
        setShowAttentionAnimation(true);
        setTimeout(() => setShowAttentionAnimation(false), 3000);
      }, 15000); // 15 seconds interval - more frequent than before
      
      return () => {
        clearInterval(attentionInterval);
        clearTimeout(initialTimer);
      };
    }
  }, [isOpen]);

  // Scroll to top of content when section changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [currentSection, selectedService]);

  // Fetch latest CMS data when opened
  useEffect(() => {
    if (isOpen) {
      updateCmsData();
      // Hide attention animation when chat is open
      setShowAttentionAnimation(false);
    }
  }, [isOpen]);

  const updateCmsData = async () => {
    try {
      setIsLoading(true);
      const freshContent = await refreshContent();
      if (freshContent && freshContent.chatbotData) {
        const chatbotData = freshContent.chatbotData;
        
        // Update CMS data with all possible properties
        setCmsData({
          terms: chatbotData.terms || mockTerms,
          prices: chatbotData.prices || mockPrices,
          services: chatbotData.services || [],
          paymentInfo: chatbotData.paymentInfo || paymentInfo,
          processSteps: chatbotData.processSteps || processSteps,
          revisionPolicy: chatbotData.revisionPolicy || {
            standardRevisions: "All projects include two rounds of revisions at no additional cost.",
            revisionItems: [
              "Design adjustments within the approved concept",
              "Minor content changes",
              "Color and typography adjustments",
              "Layout refinements"
            ],
            additionalRevisions: "After the included revision rounds, additional revisions are billed at our hourly rate."
          },
          contactInfo: chatbotData.contactInfo || {
            email: personalData.email || "jeremiah.oladele@example.com",
            phone: "(123) 456-7890",
            responseTime: "We typically respond to all inquiries within 24 hours during business days."
          }
        });
        
        // Update service details map if services are provided in CMS
        if (chatbotData.services && chatbotData.services.length > 0) {
          const servicesMap: Record<string, ServiceDetail> = {};
          chatbotData.services.forEach((service: ServiceDetail) => {
            // Use name if available, otherwise use title as the key
            const key = service.name || service.title;
            servicesMap[key] = service;
          });
          setServiceDetailsMap(servicesMap);
        }
      }
    } catch (error) {
      console.error("Failed to update CMS data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetMenu = () => {
    setCurrentSection(MenuSection.MAIN);
    setHistory([]);
    setSelectedService(null);
  };

  const navigateTo = (section: MenuSection) => {
    setHistory(prev => [...prev, currentSection]);
    setCurrentSection(section);
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousSection = history[history.length - 1];
      setCurrentSection(previousSection);
      setHistory(prev => prev.slice(0, -1));
      
      // If going back from a service detail, clear the selected service
      if (currentSection === MenuSection.PRICING && previousSection === MenuSection.SERVICES) {
        setSelectedService(null);
      }
    } else {
      // If no history, go to main menu
      setCurrentSection(MenuSection.MAIN);
    }
  };

  const selectService = (service: string) => {
    setSelectedService(service);
    navigateTo(MenuSection.PRICING);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isNewMessage) setIsNewMessage(false);
    if (!isOpen) {
      // Reset to main menu when opening
      resetMenu();
    }
  };

  // Handle quote form submission
  const handleQuoteFormSubmit = async () => {
    // Basic validation
    if (!quoteFormData.name || !quoteFormData.email || !quoteFormData.service || !quoteFormData.message) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please fill in all required fields: name, email, service, and message.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(quoteFormData.email)) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please enter a valid email address.'
      });
      return;
    }

    // Start submission
    setFormState({ isSubmitting: true, isSuccess: false, isError: false, errorMessage: '' });
    
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteFormData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }
      
      // Success!
      setFormState({ isSubmitting: false, isSuccess: true, isError: false, errorMessage: '' });
      
      // Reset form
      setQuoteFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setFormState(prev => ({ ...prev, isSuccess: false }));
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting quote request:', error);
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'Failed to submit quote request. Please try again later.'
      });
    }
  };

  // Helper function to render menu buttons
  const renderMenuButton = (label: string, section: MenuSection, icon?: ReactNode) => (
    <motion.button
      onClick={() => navigateTo(section)}
      className="w-full mb-2 bg-[var(--background)] hover:bg-[var(--primary)] hover:text-white text-[var(--foreground)] 
        transition-colors px-4 py-3 rounded-lg font-medium border border-[var(--primary)] border-opacity-30 
        flex items-center justify-between group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center">
        {icon ? (
          <span className="mr-3 text-[var(--primary)] group-hover:text-white">{icon}</span>
        ) : null}
        {label}
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </motion.button>
  );

  // Render content based on the current section
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-[var(--primary)] opacity-50 rounded mb-4"></div>
            <p className="text-[var(--foreground)]">Loading...</p>
          </div>
        </div>
      );
    }
    
    switch (currentSection) {
      case MenuSection.MAIN:
        return (
          <div className="space-y-2">
            <div className="bg-[var(--primary)]/10 p-4 rounded-lg mb-4 border border-[var(--primary)]/20">
              <p className="text-[var(--foreground)] font-medium">
                Welcome to {mockUser.business}! How can I help you today?
              </p>
            </div>
            
            {renderMenuButton("Our Services", MenuSection.SERVICES, 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            )}
            
            {renderMenuButton("Pricing", MenuSection.PRICING,
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            )}
            
            {renderMenuButton("Terms & Policies", MenuSection.TERMS,
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            )}
            
            {renderMenuButton("Payment Process", MenuSection.PAYMENT,
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            )}
            
            {renderMenuButton("Revision Policy", MenuSection.REVISIONS,
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            )}
            
            {renderMenuButton("Project Process", MenuSection.PROCESS,
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"></path>
                <path d="M12 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
            )}
            
            {renderMenuButton("Contact Information", MenuSection.CONTACT,
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            )}
          </div>
        );

      case MenuSection.SERVICES:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">Our Services</h3>
            <p className="text-[var(--foreground)] mb-2">
              We offer the following digital solutions:
            </p>
            <div className="grid gap-3">
              {Object.keys(serviceDetailsMap).map(service => (
                <motion.button
                  key={service}
                  onClick={() => selectService(service)}
                  className="w-full text-left mb-2 bg-[var(--background)] hover:bg-[var(--primary)]/10
                    text-[var(--foreground)] transition-colors px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30
                    hover:border-opacity-60 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Minecraft-style hover effect */}
                  <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  
                  <div className="font-bold flex items-center">
                    <span className="inline-block w-6 h-6 bg-[var(--primary)] rounded mr-2 flex-shrink-0 
                      items-center justify-center text-white text-xs font-bold hidden sm:flex">
                      {service[0]}
                    </span>
                    {service}
                  </div>
                  <div className="text-sm opacity-80 mt-1">{serviceDetailsMap[service].description}</div>
                  <div className="text-xs mt-2 flex justify-between items-center">
                    <span className="font-medium">{serviceDetailsMap[service].price}</span>
                    <span className="text-[var(--primary)] font-medium flex items-center">
                      View details
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case MenuSection.PRICING:
        if (selectedService) {
          const service = serviceDetailsMap[selectedService];
          return (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[var(--foreground)]">{service.title}</h3>
              <p className="text-[var(--foreground)]">{service.description}</p>
              
              <div className="bg-[var(--primary)]/10 rounded-lg p-4 border border-[var(--primary)] border-opacity-30">
                <div className="flex items-end gap-1">
                  <div className="text-xl font-bold text-[var(--primary)]">{service.price}</div>
                  <div className="text-sm opacity-70 mb-0.5">starting price</div>
                </div>
              </div>
              
              <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--primary)] border-opacity-20">
                <h4 className="font-bold text-[var(--foreground)] mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                    <path d="m5 12 5 5 9-9"/>
                  </svg>
                  What's included:
                </h4>
                <ul className="space-y-1">
                  {service.features.map((feature, i) => (
                    <li key={i} className="text-[var(--foreground)] flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-[var(--primary)] rounded-sm mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2">
                <motion.button
                  onClick={() => navigateTo(MenuSection.CONTACT)}
                  className="w-full bg-[var(--primary)] hover:bg-[var(--primary)]/80 text-white 
                    transition-colors px-4 py-3 rounded-lg font-bold flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Get in Touch
                </motion.button>
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-2">
              <h3 className="text-lg font-bold mb-2 text-[var(--foreground)]">Pricing</h3>
              <p className="text-[var(--foreground)] mb-3">
                Here's an overview of our pricing for different services:
              </p>
              
              <div className="bg-[var(--background)] rounded-lg border border-[var(--primary)] border-opacity-30 overflow-hidden">
                <table className="w-full text-[var(--foreground)]">
                  <thead className="bg-[var(--primary)]/10">
                    <tr>
                      <th className="text-left px-4 py-2">Service</th>
                      <th className="text-right px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--primary)]/10">
                    {cmsData.prices.map((item) => (
                      <tr key={item.service} className="hover:bg-[var(--primary)]/5 cursor-pointer"
                          onClick={() => selectService(item.service)}>
                        <td className="px-4 py-3">{item.service}</td>
                        <td className="px-4 py-3 text-right font-medium">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-sm text-[var(--foreground)] opacity-70 mt-2">
                * Prices may vary based on project specifics. Click on a service for more details.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => navigateTo(MenuSection.SERVICES)}
                  className="text-[var(--primary)] font-medium hover:underline flex items-center text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  View detailed service descriptions
                </button>
              </div>
            </div>
          );
        }

      case MenuSection.TERMS:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Terms & Policies</h3>
            
            <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--primary)] border-opacity-30">
              <ul className="space-y-3">
                {cmsData.terms.map((term, i) => (
                  <li key={i} className="text-[var(--foreground)] flex items-start">
                    <div className="w-6 h-6 rounded bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold mr-3 flex-shrink-0 mt-0.5 border border-[var(--primary)]/20">
                      {i + 1}
                    </div>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <motion.button
                onClick={() => navigateTo(MenuSection.REVISIONS)}
                className="bg-[var(--background)] hover:bg-[var(--primary)]/10 
                  text-[var(--foreground)] transition-colors px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30
                  hover:border-opacity-60 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
                Revision Policy
              </motion.button>
              
              <motion.button
                onClick={() => navigateTo(MenuSection.PAYMENT)}
                className="bg-[var(--background)] hover:bg-[var(--primary)]/10 
                  text-[var(--foreground)] transition-colors px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30
                  hover:border-opacity-60 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Payment Details
              </motion.button>
            </div>
          </div>
        );

      case MenuSection.PAYMENT:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Payment Process</h3>
            <p className="text-[var(--foreground)]">
              Here's how our payment structure works:
            </p>
            
            <div className="space-y-6">
              {/* Payment Steps */}
              <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--primary)] border-opacity-30">
                <h4 className="font-bold text-[var(--foreground)] mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h.01" />
                    <path d="M11 7h.01" />
                    <path d="M15 7h.01" />
                    <path d="M7 11h.01" />
                    <path d="M11 11h.01" />
                    <path d="M15 11h.01" />
                    <path d="M7 15h.01" />
                    <path d="M11 15h.01" />
                    <path d="M15 15h.01" />
                  </svg>
                  Payment Steps:
                </h4>
                <ul className="space-y-2 ml-2">
                  {cmsData.paymentInfo?.steps.map((step: string, i: number) => (
                    <li key={i} className="text-[var(--foreground)] flex items-start">
                      <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)] font-bold mr-3 flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Payment Methods */}
              <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--primary)] border-opacity-30">
                <h4 className="font-bold text-[var(--foreground)] mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                  Payment Methods:
                </h4>
                <ul className="space-y-2 ml-2">
                  {cmsData.paymentInfo?.methods.map((method: string, i: number) => (
                    <li key={i} className="text-[var(--foreground)] flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-[var(--primary)] rounded-sm mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <p className="text-sm text-[var(--foreground)] opacity-70 mt-1">
              For specific payment details, please ask during the consultation phase.
            </p>
          </div>
        );

      case MenuSection.REVISIONS:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Revision Policy</h3>
            
            <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--primary)] border-opacity-30">
              <div className="bg-[var(--primary)]/10 p-3 rounded-lg border border-[var(--primary)]/20 mb-4">
                <h4 className="font-bold text-[var(--foreground)] flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  Standard Revisions:
                </h4>
                <p className="mt-1 text-[var(--foreground)]">
                  {cmsData.revisionPolicy?.standardRevisions || "All projects include two rounds of revisions at no additional cost."}
                </p>
              </div>
              
              <h4 className="font-bold text-[var(--foreground)] mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                What counts as a revision?
              </h4>
              <ul className="space-y-1 mb-4">
                {(cmsData.revisionPolicy?.revisionItems || [
                  "Design adjustments within the approved concept", 
                  "Minor content changes", 
                  "Color and typography adjustments", 
                  "Layout refinements"
                ]).map((item, i) => (
                  <li key={i} className="text-[var(--foreground)] flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-[var(--primary)] rounded-sm mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="border-t border-[var(--primary)]/10 pt-4 mt-4">
                <h4 className="font-bold text-[var(--foreground)] mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                    <path d="M12 1v22"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Additional Revisions:
                </h4>
                <p className="text-[var(--foreground)]">
                  {cmsData.revisionPolicy?.additionalRevisions || "After the included revision rounds, additional revisions are billed at our hourly rate."}
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => navigateTo(MenuSection.CONTACT)}
              className="mt-2 bg-[var(--background)] hover:bg-[var(--primary)]/10 
                text-[var(--foreground)] transition-colors px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30
                hover:border-opacity-60 flex items-center justify-center w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Questions? Contact Us
            </motion.button>
          </div>
        );

      case MenuSection.PROCESS:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Our Process</h3>
            <p className="text-[var(--foreground)]">
              Here's how we'll work together on your project:
            </p>
            
            {/* Process Timeline */}
            <div className="space-y-0">
              {cmsData.processSteps?.map((step: {title: string, description: string}, index: number) => (
                <div key={index} className="relative pb-6">
                  {/* Timeline connector */}
                  {index < (cmsData.processSteps?.length || 0) - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-[var(--primary)]/20"></div>
                  )}
                  
                  <div className="flex gap-4">
                    {/* Step number bubble */}
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center text-[var(--primary)] font-bold flex-shrink-0 mt-1.5">
                      {index + 1}
                    </div>
                    
                    {/* Step content */}
                    <div className="space-y-1 pb-2">
                      <h4 className="font-bold text-[var(--foreground)]">{step.title}</h4>
                      <p className="text-[var(--foreground)] opacity-80">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case MenuSection.CONTACT:
        return (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Contact Information</h3>
            
            <div className="bg-[var(--background)] rounded-lg p-4 border border-[var(--primary)] border-opacity-30">
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                    flex items-center justify-center text-[var(--primary)] mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--foreground)] opacity-70">Email</div>
                    <a href={`mailto:${cmsData.contactInfo?.email || mockUser.email}`} className="text-[var(--primary)] hover:underline">
                      {cmsData.contactInfo?.email || mockUser.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                    flex items-center justify-center text-[var(--primary)] mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--foreground)] opacity-70">Phone</div>
                    <span className="text-[var(--foreground)]">{cmsData.contactInfo?.phone || "(123) 456-7890"}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 
                    flex items-center justify-center text-[var(--primary)] mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-[var(--foreground)] opacity-70">Location</div>
                    <span className="text-[var(--foreground)]">{personalData.location || "Remote"}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="bg-[var(--primary)]/10 p-3 rounded-lg border border-[var(--primary)]/20 mb-4">
                <h4 className="font-medium mb-1 flex items-center text-[var(--foreground)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                    className="mr-2 text-[var(--primary)]">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Response Time:
                </h4>
                <p className="text-[var(--foreground)] opacity-80 text-sm">
                  {cmsData.contactInfo?.responseTime || "We typically respond to all inquiries within 24 hours during business days."}
                </p>
              </div>
              
              <motion.a
                href={`mailto:${cmsData.contactInfo?.email || mockUser.email}?subject=Project Inquiry&body=Hello ${mockUser.name},%0D%0A%0D%0AI'm interested in discussing a project with you. %0D%0A%0D%0ABest regards,`}
                className="mt-2 bg-[var(--primary)] hover:bg-[var(--primary)]/80
                  text-white transition-colors px-4 py-3 rounded-lg font-bold
                  flex items-center justify-center w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
                Send an Email
              </motion.a>
            </div>
            
            {/* Quote request form */}
            <div className="mt-4">
              <div className="bg-[var(--primary)]/10 p-4 rounded-lg border border-[var(--primary)]/20">
                <h4 className="text-[var(--foreground)] font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[var(--primary)]">
                    <path d="M4 6h16M4 12h16m-7 6h7"/>
                  </svg>
                  Request a Custom Quote
                </h4>
                
                <p className="text-[var(--foreground)] text-sm mb-4">
                  Fill out the form below and we'll get back to you with a quote.
                </p>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text"
                      placeholder="Your Name"
                      value={quoteFormData.name}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, name: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)]"
                    />
                    <input 
                      type="email"
                      placeholder="Your Email"
                      value={quoteFormData.email}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, email: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="tel"
                      placeholder="Your Phone"
                      value={quoteFormData.phone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, phone: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)]"
                    />
                    <select 
                      value={quoteFormData.service}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, service: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)]"
                    >
                      <option value="">Select a Service</option>
                      {Object.keys(serviceDetailsMap).map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input 
                      type="text"
                      placeholder="Your Budget"
                      value={quoteFormData.budget}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, budget: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)]"
                    />
                    <input 
                      type="text"
                      placeholder="Project Timeline"
                      value={quoteFormData.timeline}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, timeline: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)]"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Additional Details or Questions"
                      value={quoteFormData.message}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, message: e.target.value })}
                      className="px-4 py-3 rounded-lg border border-[var(--primary)] border-opacity-30 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none text-[var(--foreground)] bg-[var(--background)] h-24 resize-none"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      onClick={handleQuoteFormSubmit}
                      className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-semibold transition-all flex items-center justify-center disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={formState.isSubmitting}
                    >
                      {formState.isSubmitting ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25"></circle>
                            <path d="M4 12a8 8 0 0 1 16 0a8 8 0 0 1-16 0" fill="currentColor"></path>
                          </svg>
                          Sending...
                        </>
                      ) : formState.isSuccess ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M9 11l3 3l7-7"/>
                          </svg>
                          Sent!
                        </>
                      ) : (
                        "Send Request"
                      )}
                    </motion.button>
                  </div>
                  
                  {formState.isError && (
                    <div className="mt-3 text-red-500 text-sm">
                      {formState.errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Hidden section for anchor navigation */}
      <div id="terms-prices-chatbot" className="hidden" />
      
      {/* Floating interactive menu */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-4 bg-[var(--stone)] bg-opacity-90 backdrop-blur-sm rounded-lg p-4 border-2 border-[var(--primary)] border-opacity-70 shadow-lg w-[90vw] max-w-md sm:w-[400px]"
            >
              {/* Header with navigation */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {currentSection !== MenuSection.MAIN && (
                    <motion.button
                      onClick={goBack}
                      className="mr-2 p-1.5 rounded-full hover:bg-[var(--primary)]/20 text-[var(--foreground)]"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                      </svg>
                    </motion.button>
                  )}
                  <h2 className="text-xl font-bold text-[var(--foreground)] font-main truncate">
                    {currentSection === MenuSection.MAIN ? "BlockCraft Info" : 
                     currentSection === MenuSection.SERVICES ? "Our Services" :
                     currentSection === MenuSection.PRICING && selectedService ? selectedService :
                     currentSection === MenuSection.PRICING ? "Pricing" :
                     currentSection === MenuSection.TERMS ? "Terms" :
                     currentSection === MenuSection.PAYMENT ? "Payment" :
                     currentSection === MenuSection.REVISIONS ? "Revisions" :
                     currentSection === MenuSection.PROCESS ? "Process" :
                     currentSection === MenuSection.CONTACT ? "Contact" : ""}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={resetMenu}
                    title="Return to main menu"
                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors p-1.5 rounded-full hover:bg-[var(--primary)]/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={toggleMenu}
                    title="Close menu"
                    className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors p-1.5 rounded-full hover:bg-[var(--primary)]/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {/* Content area */}
              <div 
                ref={contentRef}
                className="h-[60vh] sm:h-80 overflow-y-auto bg-[var(--background)] rounded-lg p-4 mb-1 border border-[var(--stone)] scrollbar-thin scrollbar-thumb-[var(--primary)]/20 scrollbar-track-transparent"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSection + (selectedService || '')}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Footer - breadcrumb navigation */}
              {history.length > 0 && (
                <div className="text-xs text-[var(--foreground)] opacity-60 mt-2 px-1 flex flex-wrap">
                  <button 
                    onClick={resetMenu}
                    className="hover:underline hover:text-[var(--primary)]"
                  >
                    Home
                  </button>
                  {history.map((section, index) => (
                    <span key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-1">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                      <button 
                        onClick={() => {
                          setCurrentSection(section);
                          setHistory(prev => prev.slice(0, index));
                          if (section !== MenuSection.PRICING) setSelectedService(null);
                        }}
                        className="hover:underline hover:text-[var(--primary)]"
                      >
                        {section === MenuSection.MAIN ? "Home" : 
                         section === MenuSection.SERVICES ? "Services" :
                         section === MenuSection.PRICING ? "Pricing" :
                         section === MenuSection.TERMS ? "Terms" :
                         section === MenuSection.PAYMENT ? "Payment" :
                         section === MenuSection.REVISIONS ? "Revisions" :
                         section === MenuSection.PROCESS ? "Process" :
                         section === MenuSection.CONTACT ? "Contact" : ""}
                      </button>
                    </span>
                  ))}
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-1">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    <span className="font-medium">
                      {currentSection === MenuSection.MAIN ? "Home" : 
                       currentSection === MenuSection.SERVICES ? "Services" :
                       currentSection === MenuSection.PRICING ? "Pricing" :
                       currentSection === MenuSection.TERMS ? "Terms" :
                       currentSection === MenuSection.PAYMENT ? "Payment" :
                       currentSection === MenuSection.REVISIONS ? "Revisions" :
                       currentSection === MenuSection.PROCESS ? "Process" :
                       currentSection === MenuSection.CONTACT ? "Contact" : ""}
                    </span>
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleMenu}
          className={`relative flex items-center justify-center w-16 h-16 rounded-lg bg-[var(--background)] border-2 border-[var(--primary)] shadow-lg text-[var(--foreground)] overflow-hidden group`}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)"
          }}
          whileTap={{ scale: 0.95 }}
          animate={
            showAttentionAnimation ? {
              scale: [1, 1.15, 1],
              transition: {
                duration: 0.7,
                repeat: 2,
                ease: "easeInOut"
              }
            } : {}
          }
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <>
              {/* Price label with animated background */}
              <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
                {/* Animated decoration */}
                <motion.div 
                  className="absolute inset-0 bg-[var(--primary)] opacity-10"
                  animate={{ 
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                />

                {/* Large price text */}
                <span className="text-xl font-bold text-[var(--primary)] leading-none group-hover:scale-110 transition-transform">
                  <span className="text-sm align-top">$</span>?
                </span>
                
                <span className="text-[9px] uppercase font-bold tracking-wider mt-1 opacity-70">
                  Terms & Prices
                </span>
              </div>
            </>
          )}
          
          {/* Heavy pulse rings - visible during attention animation */}
          {(showAttentionAnimation || isFirstLoad) && (
            <div className="absolute inset-0 pointer-events-none">
              {/* First ring */}
              <motion.div 
                className="absolute inset-0 rounded-lg border-4 border-[var(--primary)]"
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ 
                  opacity: [0.7, 0],
                  scale: [1, 2],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeOut"
                }}
              />
              
              {/* Second ring (delayed) */}
              <motion.div 
                className="absolute inset-0 rounded-lg border-4 border-[var(--primary)]"
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ 
                  opacity: [0.7, 0],
                  scale: [1, 2],
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: 0.75,
                  ease: "easeOut"
                }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg bg-[var(--primary)]"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.3, 0],
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>
          )}
        </motion.button>
      </div>
    </>
  );
};

export default TermsPricesChatbot;