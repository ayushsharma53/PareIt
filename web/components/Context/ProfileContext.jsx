import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  // 2. The Global Boolean State
  const [isProvider, setIsProvider] = useState(false);
  const [loading, setLoading] = useState(true);

  // 3. (Optional) Check local storage or API on initial load
  useEffect(() => {
    const savedStatus = localStorage.getItem('isProfileStatus') === 'true';
    setIsProvider(savedStatus);
    setLoading(false);
  }, []);

  // 4. Function to update status and persist it
  const updateProviderStatus = (status) => {
    setIsProvider(status);
    localStorage.setItem('isProfileStatus', status);
  };

  return (
    <ProfileContext.Provider value={{ isProvider, updateProviderStatus, loading }}>
      {children}
    </ProfileContext.Provider>
  );
};