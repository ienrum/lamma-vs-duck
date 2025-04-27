import { getSupabaseUser } from '@/src/app/config/get-supabase-user';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';
import { todayString } from '@/src/shared/config/today-string';
import { DeviationGraphResponseDto } from '@/src/widgets/deviation-graph/model/dto';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await getSupabaseUser(supabase);

  if (!user) {
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Unauthorized',
        data: null,
      },
      { status: 401 }
    );
  }

  const today = todayString();

  const { data, error } = await supabase.from('rank').select('score').order('score', { ascending: false });
  const { data: myScore, error: myScoreError } = await supabase
    .from('rank')
    .select('score')
    .eq('user_id', user.id)
    .lte('end_time', `${today} 23:59:59`)
    .gte('end_time', `${today} 00:00:00`)
    .single();

  if (!myScore) {
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'No data',
        data: null,
      },
      { status: 404 }
    );
  }

  if (error || myScoreError) {
    return NextResponse.json<BaseResponseDto<null>>(
      {
        message: 'Failed to get rank',
        data: null,
      },
      { status: 500 }
    );
  }

  const totalPlayers = data?.length ?? 0;
  const lowerScorePlayersThenMe = data?.filter(({ score }) => score > myScore.score).length ?? 0;
  const sameScorePlayers = data?.filter(({ score }) => score === myScore.score).length ?? 0;
  const myPercentage = ((lowerScorePlayersThenMe + 0.5 * sameScorePlayers) / totalPlayers) * 100;

  return NextResponse.json<BaseResponseDto<DeviationGraphResponseDto>>(
    {
      message: 'Success',
      data: {
        myPercentage,
        myScore: myScore.score,
      },
    },
    { status: 200 }
  );
};
