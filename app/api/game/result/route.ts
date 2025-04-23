import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { RankResponseDto } from '@/src/widgets/leader-board/model/dto/rank.dto';
import { Rank } from '@/src/widgets/leader-board/model/dto/rank.dto';
import { todayString } from '@/src/shared/config/today-string';
import { getSupabaseUser } from '@/src/app/config/get-supabase-user';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { searchParams } = new URL(request.url);
  const from = parseInt(searchParams.get('from') || '0');
  const to = parseInt(searchParams.get('to') || '0');

  try {
    const { data, error } = await supabase
      .from('rank_with_users')
      .select('*')
      .range(from, to)
      .order('score', { ascending: true })
      .gte('end_time', `${todayString()} 00:00:00`)
      .lte('end_time', `${todayString()} 23:59:59`);

    if (error) {
      throw new Error(error.message);
    }

    const response: RankResponseDto = {
      rankList: data as unknown as Rank[],
    };

    return NextResponse.json<BaseResponseDto<RankResponseDto>>(
      {
        message: 'Rank fetched successfully',
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching rank:', error);
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Failed to fetch rank data',
        data: null,
      },
      { status: 500 }
    );
  }
}
