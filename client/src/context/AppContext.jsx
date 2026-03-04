import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [deals, setDeals] = useState([]);
  const [stats, setStats] = useState({
    GOOD_DEAL: 0,
    BAD_DEAL: 0,
    NOT_A_DEAL: 0,
    total: 0
  });
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return (
    <AppContext.Provider
      value={{
        emails,
        setEmails,
        deals,
        setDeals,
        stats,
        setStats,
        selectedEmail,
        setSelectedEmail,
        selectedDeal,
        setSelectedDeal,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        activeFilter,
        setActiveFilter,
        isAnalyzing,
        setIsAnalyzing,
        refreshTrigger,
        triggerRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
