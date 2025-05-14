import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
}

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  return NextResponse.json<BaseResponseDto<Profile>>(
    {
      message: 'Profile fetched successfully',
      data: profile,
    },
    { status: 200 }
  );
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const body = await request.json();

  const { data: profile, error } = await supabase
    .from('profiles')
    .update({
      full_name: body.name,
    })
    .eq('id', user.id)
    .select('*')
    .single();

  console.log(body, user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json<BaseResponseDto<null>>(
    {
      message: 'Profile updated successfully',
      data: null,
    },
    { status: 200 }
  );
}
