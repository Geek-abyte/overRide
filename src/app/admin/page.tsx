'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ChatbotEditor from '@/components/admin/ChatbotEditor';

// Content type definitions for better type checking
type ContentSection = 'siteConfig' | 'personalData' | 'navigation' | 'skills' | 'projects' | 'experience' | 'footerContent' | 'chatbotData';

// Define detailed types for chatbot data
interface PriceItem {
  service: string;
  price: string;
}

interface ServiceDetail {
  name?: string;
  title: string;
  description: string;
  features: string[];
  price: string;
}

interface PaymentInfo {
  steps: string[];
  methods: string[];
}

interface ProcessStep {
  title: string;
  description: string;
}

interface RevisionPolicy {
  standardRevisions: string;
  revisionItems: string[];
  additionalRevisions: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  responseTime: string;
}

interface ChatbotData {
  terms: string[];
  prices: PriceItem[];
  services: ServiceDetail[];
  paymentInfo: PaymentInfo;
  processSteps: ProcessStep[];
  revisionPolicy: RevisionPolicy;
  contactInfo: ContactInfo;
}

interface SectionConfig {
  label: string;
  description: string;
}

// Configuration for how sections should be displayed in the admin UI
const SECTION_CONFIG: Record<ContentSection, SectionConfig> = {
  siteConfig: {
    label: 'Site Configuration',
    description: 'General site settings and section visibility'
  },
  personalData: {
    label: 'Personal Information',
    description: 'Your personal details like name, title, contact info'
  },
  navigation: {
    label: 'Navigation Menu',
    description: 'Configure navigation links and menu structure'
  },
  skills: {
    label: 'Skills & Technologies',
    description: 'Showcase your technical skills and expertise'
  },
  projects: {
    label: 'Projects',
    description: 'Highlight your portfolio projects and work'
  },
  experience: {
    label: 'Work Experience',
    description: 'List your professional experience and achievements'
  },
  footerContent: {
    label: 'Footer Content',
    description: 'Configure copyright, links and other footer elements'
  },
  chatbotData: {
    label: 'Terms & Prices Chatbot',
    description: 'Configure terms, prices, and chatbot content'
  }
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [content, setContent] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<ContentSection>('siteConfig');
  const [editableContent, setEditableContent] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [jsonError, setJsonError] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [validationMode, setValidationMode] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  // Ensure component only renders on client-side to prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Check if user is authenticated in session storage
    const auth = sessionStorage.getItem('cms-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      
      // Get saved API key from localStorage or use default
      const savedApiKey = localStorage.getItem('cms-api-key') || process.env.NEXT_PUBLIC_CONTENT_API_KEY || 'default-dev-key';
      setApiKey(savedApiKey);
      
      fetchContent();
    }
  }, []);

  // Get the admin password from env or use a default for development
  const getAdminPassword = () => {
    // Use default password only in development for testing
    return process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'password';
  };

  // Try to parse JSON and validate on change
  useEffect(() => {
    if (!editableContent || validationMode === false) return;
    
    try {
      JSON.parse(editableContent);
      setJsonError('');
    } catch (e: any) {
      setJsonError(e.message);
    }
  }, [editableContent, validationMode]);

  const authenticate = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = getAdminPassword();
    
    // Simple authentication
    if (password === adminPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('cms-auth', 'true');
      
      // Set default API key for authenticated users
      const defaultApiKey = process.env.NEXT_PUBLIC_CONTENT_API_KEY || 'default-dev-key';
      setApiKey(defaultApiKey);
      localStorage.setItem('cms-api-key', defaultApiKey);
      
      fetchContent();
    } else {
      setMessage('Invalid password');
    }
  };

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/content');
      if (!response.ok) throw new Error('Failed to fetch content');
      
      const data = await response.json();
      setContent(data);
      
      // Initialize editable content with the first section
      setEditableContent(JSON.stringify(data[selectedSection], null, 2));
      setIsLoading(false);
      setIsDirty(false);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage('Failed to load content');
      setIsLoading(false);
    }
  };

  const handleSectionChange = (section: ContentSection) => {
    // Prompt if there are unsaved changes
    if (isDirty) {
      const confirmChange = window.confirm('You have unsaved changes. Discard them and switch sections?');
      if (!confirmChange) return;
    }

    setSelectedSection(section);
    if (content) {
      setEditableContent(JSON.stringify(content[section], null, 2));
      setJsonError(''); // Clear error when changing sections
      setValidationMode(false); // Disable validation on section change
      setIsDirty(false);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const saveContent = async () => {
    setIsLoading(true);
    setValidationMode(true);
    
    // Store API key in localStorage for future use
    if (apiKey) {
      localStorage.setItem('cms-api-key', apiKey);
    }
    
    try {
      let parsedContent;
      
      // For the chatbot section, use the updated state directly
      if (selectedSection === 'chatbotData' && content && content.chatbotData) {
        // Make sure we're using the most up-to-date state
        parsedContent = content.chatbotData;
      } else {
        // For other sections, parse the editable content
        parsedContent = JSON.parse(editableContent);
      }
      
      console.log('Saving content:', {
        section: selectedSection,
        apiKey: apiKey ? "Provided" : "Not provided"
      });
      
      // Send the updated content to the API
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: selectedSection,
          data: parsedContent,
          apiKey: apiKey
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage('Content updated successfully!');
        // Auto-hide the message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
        
        // Update the local content state
        setContent({
          ...content,
          [selectedSection]: parsedContent
        });
        
        setIsDirty(false);
      } else {
        setMessage(`Error: ${result.error}`);
        console.error('API error details:', result);
      }
    } catch (error: any) {
      console.error('Error saving content:', error);
      setMessage(`Failed to save content: ${error.message}`);
      setJsonError(error.message);
    }
    setIsLoading(false);
  };
  
  // Add this useEffect hook for custom styles
  useEffect(() => {
    // Only add styles once
    if (!document.getElementById('admin-cms-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'admin-cms-styles';
      styleElement.innerHTML = `
        .text-glow {
          text-shadow: 0 0 10px rgba(191, 219, 254, 0.8), 0 0 20px rgba(167, 139, 250, 0.4);
        }
        .glow {
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.4), 0 0 20px rgba(147, 51, 234, 0.2);
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, [isClient]);

  // Format JSON for display in the preview mode
  const formatPreviewContent = (jsonString: string) => {
    try {
      const parsedContent = JSON.parse(jsonString);
      return JSON.stringify(parsedContent, null, 2);
    } catch (error) {
      return jsonString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {!isClient ? (
        // Render minimal placeholder UI until client-side code takes over
        <div className="w-full flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-indigo-600"></div>
          <p className="mt-4 text-indigo-800 font-medium">Loading...</p>
        </div>
      ) : (
        <>
          {/* Header - Updated with gradient and modern style */}
          <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-100 text-glow">
                Content Management System
              </h1>
              <button
                onClick={() => {
                  sessionStorage.removeItem('cms-auth');
                  setIsAuthenticated(false);
                }}
                className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-sm font-medium text-white hover:bg-white/20 focus:outline-none transition-all shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </header>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {isLoading ? (
              <div className="w-full flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
                </div>
                <p className="mt-6 text-indigo-800 font-medium">Loading content...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar - Updated with modern style */}
                <div className="lg:col-span-3 relative">
                  <div className="sticky top-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-6 border border-indigo-100 overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-24 h-24 bg-indigo-100 rounded-full opacity-50"></div>
                    <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-purple-100 rounded-full opacity-50"></div>
                    
                    <div className="relative">
                      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">Content Sections</h2>
                      <div className="flex flex-col space-y-1.5 max-h-[calc(100vh-12rem)] overflow-y-auto pr-1">
                        {Object.keys(SECTION_CONFIG).map((section) => (
                          <button
                            key={section}
                            onClick={() => handleSectionChange(section as ContentSection)}
                            className={`group px-4 py-3 rounded-lg text-left flex items-center justify-between transition-all transform hover:translate-y-[-2px] ${
                              selectedSection === section
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                : 'bg-white/80 border border-indigo-100 text-gray-800 hover:border-indigo-300 hover:text-indigo-600'
                            }`}
                          >
                            <div>
                              <span className="font-medium">{SECTION_CONFIG[section as ContentSection].label}</span>
                              <p className={`text-xs mt-1 ${selectedSection === section ? 'text-indigo-100' : 'text-gray-600'}`}>
                                {SECTION_CONFIG[section as ContentSection].description}
                              </p>
                            </div>
                            {selectedSection === section && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Main Editor Area - Updated with modern style */}
                <div className="lg:col-span-9">
                  {!isAuthenticated ? (
                    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-8 border border-indigo-100 glow">
                      <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-indigo-400 rounded-full blur-lg opacity-30 animate-pulse"></div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-indigo-600 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Admin Access</h2>
                          <p className="text-gray-600">Enter your password to manage website content</p>
                        </div>
                      </div>
                      <form onSubmit={authenticate} className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-indigo-800 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 border border-indigo-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 bg-white/80 text-gray-900"
                            required
                          />
                        </div>
                        {message && (
                          <div className="text-sm font-medium text-red-700 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                            {message}
                          </div>
                        )}
                        <button
                          type="submit"
                          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md text-sm font-medium hover:from-indigo-700 hover:to-purple-700 focus:outline-none transition-all transform hover:scale-[1.02]"
                        >
                          Login
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden border border-indigo-100">
                      {/* Editor Controls */}
                      <div className="px-6 py-4 border-b border-indigo-100 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                          Editing {selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}
                        </h3>
                        
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={togglePreviewMode}
                            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-[1.02] ${
                              isPreviewMode 
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                : 'bg-white text-indigo-700 border border-indigo-200 hover:border-indigo-300'
                            }`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Editor */}
                      <div className="p-6">
                        {!isPreviewMode ? (
                          <div className="space-y-6">
                            <div className="hidden">
                              <label className="block text-sm font-medium text-gray-800 mb-1">
                                API Key <span className="text-red-600">*</span>
                              </label>
                              <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="Enter your API key"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900"
                              />
                            </div>
                            
                            {selectedSection === 'chatbotData' ? (
                              <ChatbotEditor 
                                content={content} 
                                setContent={setContent} 
                                setEditableContent={setEditableContent}
                                setIsDirty={setIsDirty}
                              />
                            ) : (
                              <div>
                              <div>
                                <label className="block text-sm font-medium text-indigo-800 mb-1">
                                  JSON Content
                                </label>
                                {jsonError && (
                                  <span className="text-xs font-medium text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 inline-block mb-1">
                                    ⚠️ Invalid JSON: {jsonError}
                                  </span>
                                )}
                              </div>
                                <div className={`border rounded-lg overflow-hidden ${jsonError ? 'border-red-300 focus-within:border-red-500 focus-within:ring-red-500' : 'border-indigo-200 focus-within:border-indigo-500 focus-within:ring-indigo-500 shadow-md'}`}>
                                  <textarea
                                    value={editableContent}
                                    onChange={(e) => {
                                      setEditableContent(e.target.value);
                                      setValidationMode(true);
                                    }}
                                    className="w-full h-[60vh] p-4 font-mono text-sm bg-white text-gray-900 focus:outline-none resize-none border-0"
                                    placeholder="Enter JSON content here..."
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="bg-indigo-50 rounded-lg p-4 h-[70vh] overflow-auto border border-indigo-100 shadow-md">
                            <h3 className="text-sm font-medium text-indigo-800 mb-3 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Preview
                            </h3>
                            <pre className="whitespace-pre-wrap text-sm text-gray-900 font-mono bg-white p-5 rounded-lg border border-indigo-100 shadow-sm h-full overflow-auto">
                              {formatPreviewContent(editableContent)}
                            </pre>
                          </div>
                        )}
                      </div>
                      
                      {/* Footer actions */}
                      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-100 flex items-center justify-between">
                        {message && (
                          <div className={`text-sm font-medium px-4 py-2 rounded-lg ${
                            message.includes('Error') || message.includes('Failed') 
                              ? 'text-red-700 bg-red-50 border border-red-200' 
                              : 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          }`}>
                            {message.includes('Error') || message.includes('Failed') 
                              ? '❌ ' 
                              : '✅ '
                            }
                            {message}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-3 ml-auto">
                          <button
                            onClick={() => handleSectionChange(selectedSection)}
                            className="px-5 py-2.5 border border-indigo-200 bg-white text-indigo-700 rounded-lg text-sm font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-all transform hover:scale-[1.02]"
                          >
                            Reset
                          </button>
                          <button
                            onClick={saveContent}
                            disabled={isLoading || !!jsonError}
                            className={`px-5 py-2.5 rounded-lg text-sm text-white font-medium transition-all transform hover:scale-[1.02] ${
                              isLoading || !!jsonError
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md'
                            }`}
                          >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}