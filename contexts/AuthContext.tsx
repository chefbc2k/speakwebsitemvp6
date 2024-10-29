'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAddress, useMetamask, useDisconnect, useSDK } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: () => Promise<void>;
  logout: () => void;
  address: string | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const sdk = useSDK();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      setIsLoggedIn(true);
      checkAdminStatus();
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, [address]);

  const checkAdminStatus = async () => {
    // TODO: Implement admin check logic
    // For now, we'll just set a dummy condition
    setIsAdmin(address === "0x1234567890123456789012345678901234567890");
  };

  const login = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  const logout = () => {
    disconnect();
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout, address }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};