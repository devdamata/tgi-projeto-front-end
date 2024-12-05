// context/UserContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode, initialUser: User | null }> = ({ children, initialUser }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    }
  }, [initialUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}      
    </UserContext.Provider>
  );
};
