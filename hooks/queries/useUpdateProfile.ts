import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UserProfile } from '@/contexts/UserContext';

async function updateProfileAPI(address: string, data: Partial<UserProfile>) {
  const response = await fetch(`/api/users/${address}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
}

export function useUpdateProfile(address: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => updateProfileAPI(address, data),
    onSuccess: (updatedProfile) => {
      // Invalidate and refetch user profile data
      queryClient.setQueryData(['userProfile', address], updatedProfile);
      queryClient.invalidateQueries({ queryKey: ['userProfile', address] });
    },
  });
} 