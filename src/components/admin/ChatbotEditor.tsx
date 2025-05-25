import { useState, useEffect } from 'react';

// Types
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

interface ChatbotEditorProps {
  content: any;
  setContent: (content: any) => void;
  setEditableContent: (content: string) => void;
  setIsDirty: (isDirty: boolean) => void;
}

const ChatbotEditor = ({ content, setContent, setEditableContent, setIsDirty }: ChatbotEditorProps) => {
  // Add error state to handle potential issues
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('terms');
  const [localData, setLocalData] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize data when component mounts
  useEffect(() => {
    if (!content || !content.chatbotData) return;

    try {
      // Create a deep clone of the data with default values for missing properties
      const safeData = {
        terms: Array.isArray(content.chatbotData.terms) ? content.chatbotData.terms : [],
        prices: Array.isArray(content.chatbotData.prices) ? content.chatbotData.prices : [],
        services: Array.isArray(content.chatbotData.services) ? content.chatbotData.services : [],
        paymentInfo: {
          steps: Array.isArray(content.chatbotData.paymentInfo?.steps) ? content.chatbotData.paymentInfo.steps : [],
          methods: Array.isArray(content.chatbotData.paymentInfo?.methods) ? content.chatbotData.paymentInfo.methods : []
        },
        processSteps: Array.isArray(content.chatbotData.processSteps) ? content.chatbotData.processSteps : [],
        revisionPolicy: {
          standardRevisions: content.chatbotData.revisionPolicy?.standardRevisions || '',
          revisionItems: Array.isArray(content.chatbotData.revisionPolicy?.revisionItems) ? 
            content.chatbotData.revisionPolicy.revisionItems : [],
          additionalRevisions: content.chatbotData.revisionPolicy?.additionalRevisions || ''
        },
        contactInfo: {
          email: content.chatbotData.contactInfo?.email || '',
          phone: content.chatbotData.contactInfo?.phone || '',
          responseTime: content.chatbotData.contactInfo?.responseTime || ''
        }
      };

      setLocalData(safeData);
      setEditableContent(JSON.stringify(safeData, null, 2));
      setIsInitialized(true);
    } catch (err) {
      console.error("Error initializing chatbot data:", err);
      setError("Failed to initialize chatbot editor. Please try again.");
    }
  }, [content, setEditableContent]);

  // Add styles for the animations to the head of the document
  useEffect(() => {
    // Only add styles once
    if (!document.getElementById('chatbot-editor-styles')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'chatbot-editor-styles';
      styleElement.innerHTML = `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
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
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
      `;
      document.head.appendChild(styleElement);
    }
  }, []);

  // Show loading state while initializing
  if (!content) {
    return <div className="flex items-center justify-center p-8 bg-indigo-50 rounded-lg border-2 border-indigo-300 shadow-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-indigo-700 font-medium">Loading content...</p>
      </div>
    </div>;
  }

  // Handle missing chatbot data
  if (!content.chatbotData) {
    return (
      <div className="overflow-hidden relative rounded-xl border-4 border-indigo-600 bg-gradient-to-br from-indigo-800 via-purple-700 to-violet-800 shadow-2xl">
        {/* Animated particles */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-32 h-32 rounded-full bg-pink-500 mix-blend-screen filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-24 h-24 rounded-full bg-yellow-500 mix-blend-screen filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-36 h-36 rounded-full bg-blue-500 mix-blend-screen filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 rounded-full bg-purple-500 mix-blend-screen filter blur-xl opacity-40 animate-blob animation-delay-6000"></div>
        </div>
        
        {/* Futuristic Grid Pattern */}
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}>
        </div>
        
        <div className="relative z-10 p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            {/* Neon border effect */}
            <div className="p-px bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl shadow-xl glow">
              <div className="bg-black/70 backdrop-blur-sm p-8 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                {/* 3D Robot Icon */}
                <div className="relative transform transition-transform hover:scale-105 hover:rotate-3 duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-70 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 p-8 rounded-xl">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-28 h-28 relative">
                        {/* Robot head */}
                        <div className="absolute top-0 left-0 right-0 h-16 w-20 mx-auto bg-slate-700 rounded-t-xl border-t-2 border-x-2 border-indigo-300"></div>
                        
                        {/* Robot eyes */}
                        <div className="absolute top-3 left-0 right-0 flex justify-center gap-5">
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-80"></div>
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-150 opacity-80"></div>
                        </div>
                        
                        {/* Robot mouth */}
                        <div className="absolute top-9 left-0 right-0 mx-auto w-10 h-2 bg-cyan-300 rounded-full"></div>
                        
                        {/* Robot body */}
                        <div className="absolute top-16 left-0 right-0 mx-auto w-24 h-12 bg-slate-700 rounded-lg border-2 border-indigo-300"></div>
                        
                        {/* Robot buttons */}
                        <div className="absolute top-19 left-0 right-0 mx-auto flex justify-center gap-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                        
                        {/* Robot arms */}
                        <div className="absolute top-16 left-0 w-3 h-10 bg-slate-700 rounded-full"></div>
                        <div className="absolute top-16 right-0 w-3 h-10 bg-slate-700 rounded-full"></div>
                        
                        {/* Robot legs */}
                        <div className="absolute bottom-0 left-5 w-3 h-8 bg-slate-700 rounded-full"></div>
                        <div className="absolute bottom-0 right-5 w-3 h-8 bg-slate-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 text-center md:text-left">
                  {/* Glowing text effect */}
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-glow">
                    Chatbot Not Initialized
                  </h2>
                  
                  <p className="text-indigo-100 text-lg max-w-md">
                    Your AI assistant needs configuration data to help visitors understand your terms and services.
                  </p>
                  
                  <button 
                    onClick={() => {
                      try {
                        // Create default structure with basic data
                        const defaultChatbotData = {
                          terms: ["All projects require a 30% upfront deposit.", "Revisions are included up to 2 rounds per project."],
                          prices: [{ service: "Landing Page", price: "$400" }, { service: "Full Website", price: "$1200+" }],
                          services: [],
                          paymentInfo: { steps: [], methods: [] },
                          processSteps: [],
                          revisionPolicy: { standardRevisions: '', revisionItems: [], additionalRevisions: '' },
                          contactInfo: { email: '', phone: '', responseTime: '' }
                        };
                        
                        // Update content with default data
                        setContent({
                          ...content,
                          chatbotData: defaultChatbotData
                        });
                        
                        // Update editable content
                        setEditableContent(JSON.stringify(defaultChatbotData, null, 2));
                        setIsDirty(true);
                      } catch (err) {
                        console.error("Error initializing default data:", err);
                        setError("Failed to initialize default data. Please try again.");
                      }
                    }}
                    className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-indigo-500/50"
                  >
                    <span className="absolute top-0 left-0 h-full w-1/4 bg-white/20 skew-x-[25deg] transform transition-all duration-700 group-hover:translate-x-[400%]"></span>
                    <span className="relative flex items-center justify-center text-lg font-bold">
                      <span className="mr-2">⚡</span>
                      Initialize Chatbot
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-all duration-300 transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </button>
                  
                  {/* Typing indicator effect */}
                  <div className="flex justify-center md:justify-start space-x-1 mt-4">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Code floating elements */}
        <div className="absolute bottom-4 left-6 text-blue-300/40 font-mono text-xs animate-float">{"<Chatbot terms={[]} />"}</div>
        <div className="absolute top-6 right-8 text-pink-300/40 font-mono text-xs animate-float-delayed">{"function initBot() { ... }"}</div>
      </div>
    );
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 rounded-md p-6 text-center shadow-lg">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 bg-red-200 rounded-full animate-ping opacity-30"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-red-700 font-medium text-xl mb-3">{error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all transform hover:scale-105 shadow-md font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Show loading state while initializing
  if (!isInitialized || !localData) {
    return <div className="flex items-center justify-center p-8 bg-indigo-50 rounded-lg border-2 border-indigo-300 shadow-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-indigo-700 font-medium">Initializing editor...</p>
      </div>
    </div>;
  }

  // Update local data and propagate changes
  const updateData = (newData: any) => {
    setLocalData(newData);
    setEditableContent(JSON.stringify(newData, null, 2));
    
    // Update main content
    setContent({
      ...content,
      chatbotData: newData
    });
    
    setIsDirty(true);
  };

  // Simple handler for array items
  const handleArrayItemChange = (section: string, index: number, value: any) => {
    const newArray = [...localData[section]];
    newArray[index] = value;
    
    updateData({
      ...localData,
      [section]: newArray
    });
  };

  // Add an item to an array
  const addArrayItem = (section: string, defaultValue: any) => {
    const newArray = [...(localData[section] || []), defaultValue];
    
    updateData({
      ...localData,
      [section]: newArray
    });
  };

  // Remove an item from an array
  const removeArrayItem = (section: string, index: number) => {
    const newArray = [...localData[section]];
    newArray.splice(index, 1);
    
    updateData({
      ...localData,
      [section]: newArray
    });
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'terms':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Terms & Conditions</h3>
              <button
                onClick={() => addArrayItem('terms', 'New term')}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Term
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(localData.terms || []).map((term: string, index: number) => (
                <div key={`term-${index}`} className="group relative bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-indigo-300">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => removeArrayItem('terms', index)}
                      className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 border-b border-indigo-100">
                    <h4 className="font-medium text-indigo-800">Term #{index + 1}</h4>
                  </div>
                  
                  <div className="p-4">
                    <textarea
                      value={term || ''}
                      onChange={(e) => handleArrayItemChange('terms', index, e.target.value)}
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 shadow-sm transition-colors"
                      rows={3}
                      placeholder="Enter term condition here..."
                    />
                  </div>
                </div>
              ))}
              
              {/* Empty state / Add new card */}
              {(localData.terms || []).length === 0 && (
                <div 
                  onClick={() => addArrayItem('terms', 'New term')}
                  className="bg-white/50 border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-indigo-600 font-medium">Add your first term</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'prices':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Price List</h3>
              <button
                onClick={() => addArrayItem('prices', { service: 'New Service', price: '$0' })}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Price
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(localData.prices || []).map((price: PriceItem, index: number) => (
                <div key={index} className="group relative bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-indigo-300">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removeArrayItem('prices', index)}
                      className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 border-b border-indigo-100">
                    <h4 className="font-medium text-indigo-800">Price Item #{index + 1}</h4>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-indigo-700 mb-1">Service</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={price.service}
                            onChange={(e) => {
                              const newPrices = [...localData.prices];
                              newPrices[index] = { ...price, service: e.target.value };
                              updateData({ ...localData, prices: newPrices });
                            }}
                            className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                            placeholder="e.g. Website Design"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-indigo-700 mb-1">Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={price.price}
                            onChange={(e) => {
                              const newPrices = [...localData.prices];
                              newPrices[index] = { ...price, price: e.target.value };
                              updateData({ ...localData, prices: newPrices });
                            }}
                            className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                            placeholder="e.g. $1000"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty state / Add new card */}
              {(localData.prices || []).length === 0 && (
                <div 
                  onClick={() => addArrayItem('prices', { service: 'New Service', price: '$0' })}
                  className="bg-white/50 border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-indigo-600 font-medium">Add your first price item</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Services</h3>
              <button
                onClick={() => addArrayItem('services', {
                  name: 'New Service',
                  title: 'New Service',
                  description: 'Service description',
                  features: ['Feature 1'],
                  price: '$0'
                })}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Service
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {(localData.services || []).map((service: ServiceDetail, index: number) => (
                <div key={index} className="group bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-indigo-300">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-indigo-100 flex justify-between items-center">
                    <h4 className="font-medium text-lg text-indigo-800 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Service #{index + 1}
                    </h4>
                    <button
                      onClick={() => removeArrayItem('services', index)}
                      className="text-red-500 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-indigo-700 mb-1">Service Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={service.name || ''}
                            onChange={(e) => {
                              const newServices = [...localData.services];
                              newServices[index] = { ...service, name: e.target.value };
                              updateData({ ...localData, services: newServices });
                            }}
                            className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                            placeholder="e.g. Basic Website Package"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-indigo-700 mb-1">Price</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            value={service.price || ''}
                            onChange={(e) => {
                              const newServices = [...localData.services];
                              newServices[index] = { ...service, price: e.target.value };
                              updateData({ ...localData, services: newServices });
                            }}
                            className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                            placeholder="e.g. $999"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Description</label>
                      <textarea
                        value={service.description || ''}
                        onChange={(e) => {
                          const newServices = [...localData.services];
                          newServices[index] = { ...service, description: e.target.value };
                          updateData({ ...localData, services: newServices });
                        }}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                        rows={3}
                        placeholder="Describe your service here..."
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-indigo-700">Features</label>
                        <button
                          onClick={() => {
                            const newServices = [...localData.services];
                            const newFeatures = [...(service.features || []), 'New feature'];
                            newServices[index] = { ...service, features: newFeatures };
                            updateData({ ...localData, services: newServices });
                          }}
                          className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 font-medium flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Feature
                        </button>
                      </div>
                      <div className="bg-indigo-50/50 rounded-lg p-4 border border-indigo-100">
                        <div className="space-y-2">
                          {(service.features || []).map((feature: string, featureIndex: number) => (
                            <div key={featureIndex} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-indigo-100 shadow-sm">
                              <div className="flex-shrink-0 text-indigo-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) => {
                                  const newServices = [...localData.services];
                                  const newFeatures = [...service.features];
                                  newFeatures[featureIndex] = e.target.value;
                                  newServices[index] = { ...service, features: newFeatures };
                                  updateData({ ...localData, services: newServices });
                                }}
                                className="flex-1 p-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                                placeholder="Enter feature..."
                              />
                              <button
                                onClick={() => {
                                  const newServices = [...localData.services];
                                  const newFeatures = [...service.features];
                                  newFeatures.splice(featureIndex, 1);
                                  newServices[index] = { ...service, features: newFeatures };
                                  updateData({ ...localData, services: newServices });
                                }}
                                className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          ))}
                          
                          {(service.features || []).length === 0 && (
                            <div className="text-center py-4 text-indigo-400">
                              No features added yet. Click "Add Feature" to get started.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty state / Add new card */}
              {(localData.services || []).length === 0 && (
                <div 
                  onClick={() => addArrayItem('services', {
                    name: 'New Service',
                    title: 'New Service',
                    description: 'Service description',
                    features: ['Feature 1'],
                    price: '$0'
                  })}
                  className="bg-white/50 border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-indigo-600 font-medium mb-1">Add your first service</p>
                  <p className="text-indigo-400 text-sm">Define the services you offer with features and pricing</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Payment Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Steps */}
              <div className="bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100">
                  <h4 className="font-medium text-indigo-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Payment Steps
                  </h4>
                </div>
                
                <div className="p-5">
                  <div className="space-y-3 mb-4">
                    {(localData.paymentInfo?.steps || []).map((step: string, index: number) => (
                      <div key={`payment-step-${index}`} className="group relative bg-white border border-indigo-100 rounded-lg p-3 shadow-sm hover:border-indigo-300 transition-all">
                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => {
                              const newPaymentInfo = {...localData.paymentInfo};
                              const newSteps = [...newPaymentInfo.steps];
                              newSteps.splice(index, 1);
                              newPaymentInfo.steps = newSteps;
                              
                              updateData({
                                ...localData,
                                paymentInfo: newPaymentInfo
                              });
                            }}
                            className="p-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold text-sm mr-3 mt-1">
                            {index + 1}
                          </div>
                          <textarea
                            value={step || ''}
                            onChange={(e) => {
                              const newPaymentInfo = {...localData.paymentInfo};
                              const newSteps = [...newPaymentInfo.steps];
                              newSteps[index] = e.target.value;
                              newPaymentInfo.steps = newSteps;
                              
                              updateData({
                                ...localData,
                                paymentInfo: newPaymentInfo
                              });
                            }}
                            className="flex-1 p-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 resize-none"
                            rows={2}
                            placeholder="Describe this payment step..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {(localData.paymentInfo?.steps || []).length === 0 && (
                      <div className="text-center py-3 text-indigo-400 bg-indigo-50/50 rounded-lg">
                        No payment steps added yet
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      const newPaymentInfo = {...localData.paymentInfo};
                      const newSteps = [...(newPaymentInfo.steps || []), 'New payment step'];
                      newPaymentInfo.steps = newSteps;
                      
                      updateData({
                        ...localData,
                        paymentInfo: newPaymentInfo
                      });
                    }}
                    className="w-full px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-sm transition-all flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Payment Step
                  </button>
                </div>
              </div>
              
              {/* Payment Methods */}
              <div className="bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100">
                  <h4 className="font-medium text-indigo-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Payment Methods
                  </h4>
                </div>
                
                <div className="p-5">
                  <div className="space-y-3 mb-4">
                    {(localData.paymentInfo?.methods || []).map((method: string, index: number) => (
                      <div key={`payment-method-${index}`} className="group relative bg-white border border-indigo-100 rounded-lg p-3 shadow-sm hover:border-indigo-300 transition-all">
                        <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => {
                              const newPaymentInfo = {...localData.paymentInfo};
                              const newMethods = [...newPaymentInfo.methods];
                              newMethods.splice(index, 1);
                              newPaymentInfo.methods = newMethods;
                              
                              updateData({
                                ...localData,
                                paymentInfo: newPaymentInfo
                              });
                            }}
                            className="p-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="mr-3 text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <textarea
                            value={method || ''}
                            onChange={(e) => {
                              const newPaymentInfo = {...localData.paymentInfo};
                              const newMethods = [...newPaymentInfo.methods];
                              newMethods[index] = e.target.value;
                              newPaymentInfo.methods = newMethods;
                              
                              updateData({
                                ...localData,
                                paymentInfo: newPaymentInfo
                              });
                            }}
                            className="flex-1 p-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800 resize-none"
                            rows={2}
                            placeholder="Describe this payment method..."
                          />
                        </div>
                      </div>
                    ))}
                    
                    {(localData.paymentInfo?.methods || []).length === 0 && (
                      <div className="text-center py-3 text-indigo-400 bg-indigo-50/50 rounded-lg">
                        No payment methods added yet
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => {
                      const newPaymentInfo = {...localData.paymentInfo};
                      const newMethods = [...(newPaymentInfo.methods || []), 'New payment method'];
                      newPaymentInfo.methods = newMethods;
                      
                      updateData({
                        ...localData,
                        paymentInfo: newPaymentInfo
                      });
                    }}
                    className="w-full px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-sm transition-all flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Payment Method
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'process':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Process Steps</h3>
              <button
                onClick={() => {
                  const newProcessSteps = [...(localData.processSteps || []), { 
                    title: 'New Step', 
                    description: 'Description of this step'
                  }];
                  
                  updateData({
                    ...localData,
                    processSteps: newProcessSteps
                  });
                }}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md transition-all transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Process Step
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {(localData.processSteps || []).map((step: ProcessStep, index: number) => (
                <div key={`process-step-${index}`} className="group bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-indigo-300">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {index + 1}
                      </div>
                      <h4 className="font-medium text-indigo-800">Process Step {index + 1}</h4>
                    </div>
                    <button
                      onClick={() => {
                        const newProcessSteps = [...localData.processSteps];
                        newProcessSteps.splice(index, 1);
                        
                        updateData({
                          ...localData,
                          processSteps: newProcessSteps
                        });
                      }}
                      className="text-red-500 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors flex items-center opacity-0 group-hover:opacity-100"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Remove
                    </button>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Step Title</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => {
                            const newProcessSteps = [...localData.processSteps];
                            newProcessSteps[index] = { ...step, title: e.target.value };
                            
                            updateData({
                              ...localData,
                              processSteps: newProcessSteps
                            });
                          }}
                          className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                          placeholder="e.g. Discovery Phase"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-indigo-700 mb-1">Description</label>
                      <textarea
                        value={step.description || ''}
                        onChange={(e) => {
                          const newProcessSteps = [...localData.processSteps];
                          newProcessSteps[index] = { ...step, description: e.target.value };
                          
                          updateData({
                            ...localData,
                            processSteps: newProcessSteps
                          });
                        }}
                        className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                        rows={3}
                        placeholder="Describe what happens during this step of the process..."
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty state */}
              {(localData.processSteps || []).length === 0 && (
                <div 
                  onClick={() => {
                    const newProcessSteps = [...(localData.processSteps || []), { 
                      title: 'New Step', 
                      description: 'Description of this step'
                    }];
                    
                    updateData({
                      ...localData,
                      processSteps: newProcessSteps
                    });
                  }}
                  className="bg-white/50 border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center p-8 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <p className="text-indigo-600 font-medium mb-1">Add your first process step</p>
                  <p className="text-indigo-400 text-sm">Define the steps involved in your client process</p>
                </div>
              )}
            </div>
          </div>
        );
      
      case 'revisions':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Revision Policy</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Standard Revisions Card */}
              <div className="bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100">
                  <h4 className="font-medium text-indigo-800 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Standard Revisions
                  </h4>
                </div>
                
                <div className="p-5">
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Number of Included Revisions</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={localData.revisionPolicy?.standardRevisions || ''}
                        onChange={(e) => {
                          const newRevisionPolicy = {
                            ...localData.revisionPolicy,
                            standardRevisions: e.target.value
                          };
                          
                          updateData({
                            ...localData,
                            revisionPolicy: newRevisionPolicy
                          });
                        }}
                        placeholder="e.g. 2 rounds of revisions included"
                        className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-indigo-700">Revision Items</label>
                      <button
                        onClick={() => {
                          const newRevisionPolicy = {...localData.revisionPolicy};
                          const newItems = [...(newRevisionPolicy.revisionItems || []), 'New revision item'];
                          newRevisionPolicy.revisionItems = newItems;
                          
                          updateData({
                            ...localData,
                            revisionPolicy: newRevisionPolicy
                          });
                        }}
                        className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 font-medium flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Item
                      </button>
                    </div>
                    
                    <div className="bg-indigo-50/50 rounded-lg p-4 border border-indigo-100">
                      <div className="space-y-2">
                        {(localData.revisionPolicy?.revisionItems || []).map((item: string, index: number) => (
                          <div key={`revision-item-${index}`} className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-indigo-100 shadow-sm group">
                            <div className="flex-shrink-0 text-indigo-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <input
                              type="text"
                              value={item || ''}
                              onChange={(e) => {
                                const newRevisionPolicy = {...localData.revisionPolicy};
                                const newItems = [...newRevisionPolicy.revisionItems];
                                newItems[index] = e.target.value;
                                newRevisionPolicy.revisionItems = newItems;
                                
                                updateData({
                                  ...localData,
                                  revisionPolicy: newRevisionPolicy
                                });
                              }}
                              className="flex-1 p-2 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                              placeholder="Enter revision policy item..."
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newRevisionPolicy = {...localData.revisionPolicy};
                                const newItems = [...newRevisionPolicy.revisionItems];
                                newItems.splice(index, 1);
                                newRevisionPolicy.revisionItems = newItems;
                                
                                updateData({
                                  ...localData,
                                  revisionPolicy: newRevisionPolicy
                                });
                              }}
                              className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                        
                        {(localData.revisionPolicy?.revisionItems || []).length === 0 && (
                          <div className="text-center py-3 text-indigo-400">
                            No revision items added yet
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-indigo-700 mb-1">Additional Revisions Policy</label>
                    <textarea
                      value={localData.revisionPolicy?.additionalRevisions || ''}
                      onChange={(e) => {
                        const newRevisionPolicy = {
                          ...localData.revisionPolicy,
                          additionalRevisions: e.target.value
                        };
                        
                        updateData({
                          ...localData,
                          revisionPolicy: newRevisionPolicy
                        });
                      }}
                      placeholder="Describe your policy for additional revisions beyond the standard ones"
                      className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Contact Information</h3>
            </div>
            
            <div className="bg-white border border-indigo-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 border-b border-indigo-100">
                <h4 className="font-medium text-indigo-800 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Details
                </h4>
              </div>
              
              <div className="p-5 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={localData.contactInfo?.email || ''}
                      onChange={(e) => {
                        const newContactInfo = {
                          ...localData.contactInfo,
                          email: e.target.value
                        };
                        
                        updateData({
                          ...localData,
                          contactInfo: newContactInfo
                        });
                      }}
                      placeholder="contact@example.com"
                      className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={localData.contactInfo?.phone || ''}
                      onChange={(e) => {
                        const newContactInfo = {
                          ...localData.contactInfo,
                          phone: e.target.value
                        };
                        
                        updateData({
                          ...localData,
                          contactInfo: newContactInfo
                        });
                      }}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Expected Response Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={localData.contactInfo?.responseTime || ''}
                      onChange={(e) => {
                        const newContactInfo = {
                          ...localData.contactInfo,
                          responseTime: e.target.value
                        };
                        
                        updateData({
                          ...localData,
                          contactInfo: newContactInfo
                        });
                      }}
                      placeholder="Usually within 24 hours"
                      className="w-full pl-10 p-3 border border-indigo-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-800"
                    />
                  </div>
                </div>
                
                <div className="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 text-indigo-500 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-indigo-700">
                      These contact details will be provided to users who interact with your chatbot and may have additional questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Icons for tabs - more creative than circles and basic icons
  const tabIcons = {
    terms: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    prices: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    services: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    payment: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    process: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
    revisions: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    contact: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  // Generate the styles for the animation
  const styles = `
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-x {
      background-size: 200% 200%;
      animation: gradient-x 3s ease infinite;
    }
  `;

  return (
    <div className="space-y-6">
      {/* Colorful Header Banner */}
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-6 mb-8 transform hover:scale-[1.01] transition-all duration-300">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-white opacity-10 rounded-full"></div>
        
        <div className="relative z-10 flex items-center">
          <div className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white text-2xl font-bold">Chatbot Configuration</h2>
            <p className="text-indigo-100">Customize your chatbot's responses about terms, prices, and services</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation - Enhanced with animation and creative design */}
      <div className="border-0 bg-white rounded-xl shadow-lg p-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-indigo-100 opacity-50"></div>
        <nav className="flex flex-wrap gap-2 relative z-10">
          {['terms', 'prices', 'services', 'payment', 'process', 'revisions', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-3 px-5 rounded-lg font-medium text-sm transition-all flex items-center gap-2
                transform hover:translate-y-[-2px] hover:shadow-md
                ${activeTab === tab 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md scale-105' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'}
              `}
            >
              {tabIcons[tab as keyof typeof tabIcons]}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content - with enhanced container */}
      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 transition-all duration-300 transform hover:shadow-xl">
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
      
      <div className="text-sm text-indigo-800 font-medium bg-indigo-50 border-l-4 border-indigo-500 rounded-md p-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2 flex-shrink-0 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Don't forget to click "Save Changes" when you're done editing!
      </div>
    </div>
  );
};

export default ChatbotEditor; 