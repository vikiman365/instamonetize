'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export interface UserData {
  id: number;
  username: string;
  recordedAt: string;
  ip: string;
  userAgent: string;
  user_id_victim?: string;
  type?: string;
}

export interface AnalyticsData {
  lastLogin: string;
  source: string;
  userId: number;
  totalLogins: number;
}

interface UserDataContextType {
  userData: UserData | null;
  analytics: AnalyticsData | null;
  isLoading: boolean;
  error: string | null;
  updateUserData: (data: UserData) => void;
  clearUserData: () => void;
  refreshData: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDataFromCookies = () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get data from cookies
      const userDataCookie = Cookies.get('user_data');
      const analyticsCookie = Cookies.get('user_analytics');

      if (userDataCookie) {
        const parsedData: UserData = JSON.parse(userDataCookie);
        setUserData(parsedData);
        
        // Update analytics with this login
        const totalLogins = analytics?.totalLogins ? analytics.totalLogins + 1 : 1;
        
        const newAnalytics: AnalyticsData = {
          lastLogin: new Date().toISOString(),
          source: parsedData.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
          userId: parsedData.id,
          totalLogins
        };
        
        setAnalytics(newAnalytics);
        
        // Save updated analytics back to cookie
        Cookies.set('user_analytics', JSON.stringify(newAnalytics), { 
          expires: 30,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
      }

      if (analyticsCookie) {
        setAnalytics(JSON.parse(analyticsCookie));
      }

    } catch (err) {
      console.error('Error loading user data:', err);
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserData = (data: UserData) => {
    try {
      // Save to cookies
      Cookies.set('user_data', JSON.stringify(data), { 
        expires: 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      setUserData(data);
      setError(null);
      
      // Log the update
      console.log('📝 User data updated:', data);
      
    } catch (err) {
      console.error('Error updating user data:', err);
      setError('Failed to update user data');
    }
  };

  const clearUserData = () => {
    Cookies.remove('user_data');
    Cookies.remove('user_analytics');
    setUserData(null);
    setAnalytics(null);
  };

  const refreshData = () => {
    loadDataFromCookies();
  };

  useEffect(() => {
    loadDataFromCookies();
    
    // Listen for storage events (in case data is updated from another tab)
    const handleStorageChange = () => {
      loadDataFromCookies();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <UserDataContext.Provider value={{
      userData,
      analytics,
      isLoading,
      error,
      updateUserData,
      clearUserData,
      refreshData
    }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}