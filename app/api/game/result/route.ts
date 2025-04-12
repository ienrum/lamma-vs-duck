import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { RankResponseDto } from '@/src/widgets/leader-board/model/dto/rank.dto';
import { Rank } from '@/src/widgets/leader-board/model/dto/rank.dto';
import { todayString } from '@/src/shared/config/today-string';


export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();

  const { searchParams } = new URL(request.url);
  const from = parseInt(searchParams.get('from') || '0');
  const to = parseInt(searchParams.get('to') || '0');

  try {
    let query = supabase
      .from('rank')
      .select(`
        id,
        score,
        user_id,
        game_id,
        start_time,
        end_time,
        user (
          id,
          raw_user_meta_data
        )
      `)
      .range(from, to)
      .order('score', { ascending: true })
      .like('today', `${todayString()}:%`)
      .neq('score', -1);


    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    const response: RankResponseDto = {
      rankList: data as unknown as Rank[],
      myRank: data.findIndex((rank) => rank.user_id === user?.id),
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
