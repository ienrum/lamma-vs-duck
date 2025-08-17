-- 04-rls.sql
-- RLS (Row Level Security) 정책 설정
-- Lamma vs Duck 게임 데이터베이스

-- 모든 테이블에 RLS 활성화
ALTER TABLE public.game ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rank ENABLE ROW LEVEL SECURITY;

-- 기존 RLS 정책들 삭제
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Anyone can view games" ON public.game;
DROP POLICY IF EXISTS "Users can view all rankings" ON public.rank;
DROP POLICY IF EXISTS "Users can insert their own ranking" ON public.rank;
DROP POLICY IF EXISTS "Users can update their own ranking" ON public.rank;

-- 프로필 RLS 정책
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 게임 RLS 정책 (모든 사용자가 게임 목록 조회 가능)
CREATE POLICY "Anyone can view games" ON public.game
    FOR SELECT USING (true);

-- 랭킹 RLS 정책
CREATE POLICY "Users can view all rankings" ON public.rank
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own ranking" ON public.rank
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ranking" ON public.rank
    FOR UPDATE USING (auth.uid() = user_id); 