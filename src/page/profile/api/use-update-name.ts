import { BASE_URL } from '@/src/app/config/baseurl';
import { useMutation } from '@tanstack/react-query';
import { getQueryClient } from '@/src/app/utils/get-query-client';

const updateName = async (name: string) => {
  const response = await fetch(`${BASE_URL}/api/user`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error('Failed to update name');
  }

  return response.json();
};

export const useUpdateName = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (name: string) => updateName(name),
    onSuccess: () => {
      getQueryClient().invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { mutate, isPending, error };
};
