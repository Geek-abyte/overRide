"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { refreshContent } from '@/data/portfolio';

// Define the shape of our context
interface ContentContextType {
  content: any;
  refreshing: boolean;
  lastUpdated: Date | null;
  forceRefresh: () => Promise<void>;
}

// Create the context with a default value
const ContentContext = createContext<ContentContextType>({
  content: null,
  refreshing: false,
  lastUpdated: null,
  forceRefresh: async () => {}
});

// Hook to use the content context
export const useContent = () => useContext(ContentContext);

// Provider component
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchContent = async () => {
    setRefreshing(true);
    try {
      const freshContent = await refreshContent();
      setContent(freshContent);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setRefreshing(false);
    }
  };

  // Force refresh function that can be called from components
  const forceRefresh = async () => {
    await fetchContent();
  };

  // Initial content fetch
  useEffect(() => {
    fetchContent();
    
    // Set up an interval to refresh content periodically (every 15 seconds)
    const refreshInterval = setInterval(fetchContent, 15000);
    
    // Clean up the interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <ContentContext.Provider value={{ content, refreshing, lastUpdated, forceRefresh }}>
      {children}
    </ContentContext.Provider>
  );
}; 