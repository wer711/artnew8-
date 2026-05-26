import React, { createContext, useContext, useEffect, useState } from 'react';

interface DailyLimitContextType {
  usage: number;
  maxUsage: number;
  streak: number;
  incrementUsage: () => boolean;
  isLimited: boolean;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const DailyLimitContext = createContext<DailyLimitContextType>({} as DailyLimitContextType);

const MAX_USAGE = 8;

export function DailyLimitProvider({ children }: { children: React.ReactNode }) {
  const [usage, setUsage] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const data = JSON.parse(localStorage.getItem('artnew8_usage') || '{}');
    
    if (data.date !== today) {
      // New day
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newStreak = data.streak || 0;
      
      if (data.lastUseDate === yesterday) {
        newStreak++;
      } else if (data.lastUseDate !== today) {
        newStreak = 0;
      }
      
      setUsage(0);
      setStreak(newStreak);
      
      localStorage.setItem('artnew8_usage', JSON.stringify({
        ...data,
        date: today,
        streak: newStreak,
        usage: 0
      }));
    } else {
      setUsage(data.usage || 0);
      setStreak(data.streak || 0);
    }
  }, []);

  const incrementUsage = () => {
    if (usage >= MAX_USAGE) {
      setShowModal(true);
      return false; // Cannot proceed
    }
    
    const today = new Date().toISOString().split('T')[0];
    const newUsage = usage + 1;
    setUsage(newUsage);
    
    const data = JSON.parse(localStorage.getItem('artnew8_usage') || '{}');
    localStorage.setItem('artnew8_usage', JSON.stringify({
      ...data,
      usage: newUsage,
      lastUseDate: today
    }));
    
    return true;
  };

  return (
    <DailyLimitContext.Provider value={{
      usage, maxUsage: MAX_USAGE, streak, incrementUsage, 
      isLimited: usage >= MAX_USAGE, showModal, setShowModal
    }}>
      {children}
    </DailyLimitContext.Provider>
  );
}

export const useDailyLimit = () => useContext(DailyLimitContext);
