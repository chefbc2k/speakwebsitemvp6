'use client';

import { createBrowserClient } from '@supabase/ssr';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from '@/contexts/AuthContext';
import { AudioProvider } from '@/contexts/AudioContext';
import { UserProvider } from '@/contexts/UserContext';
import { Suspense } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <Suspense fallback={null}>
      <SessionContextProvider supabaseClient={supabase}>
        <ThirdwebProvider activeChain="ethereum" clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <UserProvider>
                <AudioProvider>
                  {children}
                </AudioProvider>
              </UserProvider>
            </AuthProvider>
          </ThemeProvider>
        </ThirdwebProvider>
      </SessionContextProvider>
    </Suspense>
  );
}