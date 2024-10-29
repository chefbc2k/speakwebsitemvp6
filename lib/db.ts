import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/supabase';

// For server-side operations
export function createServerClient() {
  const cookieStore = cookies();
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true
      },
      global: {
        headers: {
          'Cookie': cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
        }
      }
    }
  );
}

// For admin operations that need service role
export const adminDb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Export a default db instance for general use
export const db = {
  user: {
    findUnique: async ({ where }: { where: { address: string } }) => {
      const { data, error } = await adminDb
        .from('users')
        .select('*')
        .eq('address', where.address)
        .single();
      
      if (error) {
        throw error;
      }
      return data;
    },
    update: async ({ where, data }: { where: { address: string }, data: any }) => {
      const { data: updatedData, error } = await adminDb
        .from('users')
        .update(data)
        .eq('address', where.address)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      return updatedData;
    }
  }
}; 