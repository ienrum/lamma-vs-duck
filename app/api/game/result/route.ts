import { NextResponse } from 'next/server';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { Rank } from '@/src/widgets/leader-board/model/dto/rank.dto';
import { todayString } from '@/src/shared/config/today-string';


export async function GET(request: Request) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

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
          name
        )
      `)
      .range(from, to)
      .order('score', { ascending: true })
      .eq('today', todayString())
      .neq('score', -1)
      .not('user_id', 'is', null);


    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json<BaseResponseDto<Rank[]>>(
      {
        message: 'Rank fetched successfully',
        data: data as unknown as Rank[],
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
