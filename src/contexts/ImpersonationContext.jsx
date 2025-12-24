import React, { createContext, useContext, useState, useCallback } from 'react';

const ImpersonationContext = createContext(null);

export const useImpersonation = () => {
  const context = useContext(ImpersonationContext);
  if (!context) {
    throw new Error('useImpersonation must be used within an ImpersonationProvider');
  }
  return context;
};

export const ImpersonationProvider = ({ children }) => {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [impersonatedCustomer, setImpersonatedCustomer] = useState(null);
  const [impersonationSession, setImpersonationSession] = useState(null);
  const [pagesViewed, setPagesViewed] = useState([]);
  const [actionsPerformed, setActionsPerformed] = useState([]);
  const [sessionNotes, setSessionNotes] = useState([]);

  const startImpersonation = useCallback((customer, reason = '') => {
    const sessionId = `IMP-${Date.now()}`;
    const session = {
      id: sessionId,
      customerId: customer.id,
      customerShopperId: customer.shopperId,
      customerName: customer.name,
      customerEmail: customer.email,
      reason,
      startTime: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour
    };

    setIsImpersonating(true);
    setImpersonatedCustomer(customer);
    setImpersonationSession(session);
    setPagesViewed([]);
    setActionsPerformed([]);
    setSessionNotes([]);

    return session;
  }, []);

  const endImpersonation = useCallback(() => {
    const endTime = new Date().toISOString();
    const duration = impersonationSession 
      ? Math.round((new Date(endTime) - new Date(impersonationSession.startTime)) / 60000)
      : 0;

    const sessionLog = {
      ...impersonationSession,
      endTime,
      duration,
      pagesViewed,
      actionsPerformed,
      notes: sessionNotes
    };

    // Reset state
    setIsImpersonating(false);
    setImpersonatedCustomer(null);
    setImpersonationSession(null);
    setPagesViewed([]);
    setActionsPerformed([]);
    setSessionNotes([]);

    return sessionLog;
  }, [impersonationSession, pagesViewed, actionsPerformed, sessionNotes]);

  const logPageView = useCallback((path) => {
    if (isImpersonating) {
      setPagesViewed(prev => [...prev, { path, timestamp: new Date().toISOString() }]);
    }
  }, [isImpersonating]);

  const logAction = useCallback((action, details) => {
    if (isImpersonating) {
      setActionsPerformed(prev => [...prev, { action, details, timestamp: new Date().toISOString() }]);
    }
  }, [isImpersonating]);

  const addSessionNote = useCallback((note) => {
    if (isImpersonating) {
      const newNote = {
        id: `NOTE-${Date.now()}`,
        content: note,
        addedAt: new Date().toISOString(),
        addedDuringImpersonation: true,
        impersonationSessionId: impersonationSession?.id
      };
      setSessionNotes(prev => [...prev, newNote]);
      return newNote;
    }
    return null;
  }, [isImpersonating, impersonationSession]);

  const getSessionDuration = useCallback(() => {
    if (!impersonationSession) return 0;
    return Math.round((Date.now() - new Date(impersonationSession.startTime)) / 1000);
  }, [impersonationSession]);

  const value = {
    isImpersonating,
    impersonatedCustomer,
    impersonationSession,
    pagesViewed,
    actionsPerformed,
    sessionNotes,
    startImpersonation,
    endImpersonation,
    logPageView,
    logAction,
    addSessionNote,
    getSessionDuration
  };

  return (
    <ImpersonationContext.Provider value={value}>
      {children}
    </ImpersonationContext.Provider>
  );
};

export default ImpersonationContext;
