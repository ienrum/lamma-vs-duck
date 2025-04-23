import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';

export interface Member {
  id: string;
  name: string;
  email: string;
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

  const { data: member } = await supabase.from('members').select('*').eq('id', user.id).single();

  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  return NextResponse.json<BaseResponseDto<Member>>(
    {
      message: 'Member fetched successfully',
      data: member,
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

  const { data: member } = await supabase.auth.updateUser({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json<BaseResponseDto<null>>(
    {
      message: 'Member updated successfully',
      data: null,
    },
    { status: 200 }
  );
}
