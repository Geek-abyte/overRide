// Portfolio data for Jeremiah Oladele

import defaultContent from '../../public/content.json';

// A more robust content getter with optional fallbacks
export function getContentWithFallback(content: any, path: string, fallback: any = null): any {
  try {
    const keys = path.split('.');
    let result = content;
    
    for (const key of keys) {
      if (result === undefined || result === null) return fallback;
      result = result[key];
    }
    
    return result !== undefined ? result : fallback;
  } catch (error) {
    console.warn(`Error getting content for path: ${path}`, error);
    return fallback;
  }
}

// Safe content accessors
export const siteConfig = getContentWithFallback(defaultContent, 'siteConfig', {
  title: 'Developer Portfolio',
  sections: {
    hero: { enabled: true },
    about: { enabled: true },
    experience: { enabled: true },
    projects: { enabled: true },
    skills: { enabled: true },
    termsPricesChatbot: { enabled: true },
    contact: { enabled: true }
  }
});

export const personalData = getContentWithFallback(defaultContent, 'personalData', {
  name: 'Developer',
  title: 'Software Developer',
  email: 'developer@example.com',
  location: 'Earth',
  availability: 'Available for new opportunities',
  about: 'Software developer focused on creating amazing digital experiences.',
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  }
});

export const skills = getContentWithFallback(defaultContent, 'skills', []);
export const projects = getContentWithFallback(defaultContent, 'projects', []);
export const experience = getContentWithFallback(defaultContent, 'experience', []);
export const navigation = getContentWithFallback(defaultContent, 'navigation', {
  links: []
});

// Fix the direct reference to personalData which can cause initialization issues
const defaultEmail = "jeremiah.oladele@example.com";

export const chatbotData = getContentWithFallback(defaultContent, 'chatbotData', {
  terms: [
    "All projects require a 30% upfront deposit.",
    "Revisions are included up to 2 rounds per project.",
    "Source code is delivered upon final payment.",
    "Support is available for 30 days after delivery."
  ],
  prices: [
    { service: "Landing Page", price: "$400" },
    { service: "Full Website", price: "$1200+" },
    { service: "Web App (MVP)", price: "$2000+" },
    { service: "Consultation (per hour)", price: "$50" }
  ],
  services: [
    {
      name: "Landing Page",
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
    {
      name: "Full Website",
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
    {
      name: "Web App",
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
    }
  ],
  paymentInfo: {
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
  },
  processSteps: [
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
  ],
  revisionPolicy: {
    standardRevisions: "All projects include two rounds of revisions at no additional cost.",
    revisionItems: [
      "Design adjustments within the approved concept",
      "Minor content changes",
      "Color and typography adjustments",
      "Layout refinements"
    ],
    additionalRevisions: "After the included revision rounds, additional revisions are billed at our hourly rate."
  },
  contactInfo: {
    email: defaultEmail,
    phone: "(123) 456-7890",
    responseTime: "We typically respond to all inquiries within 24 hours during business days."
  }
});

export const footerContent = getContentWithFallback(defaultContent, 'footerContent', {
  copyright: `© ${new Date().getFullYear()} All rights reserved.`
});

// Function to refresh content for client-side updates
export async function refreshContent() {
  try {
    // Add a timestamp parameter to prevent caching
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/content?t=${timestamp}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error refreshing content:', error);
    // Return default content if fetching fails
    return defaultContent;
  }
}

// Function to check if a section is enabled
export function isSectionEnabled(sectionName: string): boolean {
  return getContentWithFallback(siteConfig, `sections.${sectionName}.enabled`, true);
}