'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAddress, useConnectionStatus, useDisconnect, useLogin, useLogout, useUser as useThirdwebUser } from "@thirdweb-dev/react";
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  address: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    privacy: 'public' | 'private';
  };
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextType {
  user: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  login: (provider: 'google' | 'twitter' | 'email') => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const { login: thirdwebLogin } = useLogin();
  const { logout: thirdwebLogout } = useLogout();
  const { user: thirdwebUser } = useThirdwebUser();
  const disconnect = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (address && thirdwebUser) {
      fetchUserProfile(address);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [address, thirdwebUser]);

  const fetchUserProfile = async (walletAddress: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${walletAddress}`);
      if (!response.ok) throw new Error('Failed to fetch user profile');
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (provider: 'google' | 'twitter' | 'email') => {
    try {
      setIsLoading(true);
      await thirdwebLogin(provider);
      if (address) {
        await fetchUserProfile(address);
        router.push('/profile');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await thirdwebLogout();
      await disconnect();
      setUser(null);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Logout failed'));
      throw err;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      if (!address) throw new Error('No wallet connected');
      
      const response = await fetch(`/api/users/${address}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const updatedProfile = await response.json();
      setUser(updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Update failed'));
      throw err;
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload avatar');
      
      const { url } = await response.json();
      await updateProfile({ avatar: url });
      return url;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Upload failed'));
      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        updateProfile,
        uploadAvatar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useAppUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAppUser must be used within a UserProvider');
  }
  return context;
}