'use server';

import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import authSupabase from '@/utils/supabase/adminClient';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const deleteAccount = async (): Promise<BaseResponseDto<boolean>> => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: 'User not found', data: false };
  }
  const { error } = await authSupabase.auth.admin.deleteUser(user.id);

  if (error) {
    console.error(error);
  }

  return { message: 'User deleted successfully', data: true };
};
