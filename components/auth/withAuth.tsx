'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function withAuth(WrappedComponent: React.ComponentType, requireAdmin: boolean = false) {
  return function AuthenticatedComponent(props: any) {
    const { isLoggedIn, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/');
      } else if (requireAdmin && !isAdmin) {
        router.push('/profile');
      }
    }, [isLoggedIn, isAdmin, router]);

    if (!isLoggedIn || (requireAdmin && !isAdmin)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}