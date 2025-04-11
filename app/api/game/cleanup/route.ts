import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { BaseResponseDto } from '@/src/app/model/backend/base-dto';

export async function POST() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  // 시작 시간이 있고 종료 시간이 없는 오래된 세션 찾기
  const { data, error } = await supabase
    .from('rank')
    .update({
      end_time: new Date().toISOString(),
      score: -1  // 비정상 종료 표시
    })
    .is('end_time', null)

  return NextResponse.json<BaseResponseDto<null>>(
    {
      message: 'Game cleanup completed',
      data: null,
    },
    { status: 200 }
  );
}