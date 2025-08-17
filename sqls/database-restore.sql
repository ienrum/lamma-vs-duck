-- Lamma vs Duck 게임 데이터베이스 복구 SQL
-- Supabase PostgreSQL 기반

-- 1. 테이블 생성 (CREATE TABLES)

-- 기존 테이블들 삭제 (의존성 순서대로)
DROP TABLE IF EXISTS public.rank CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;  
DROP TABLE IF EXISTS public.game CASCADE;

-- 게임 테이블
CREATE TABLE public.game (
    id SERIAL PRIMARY KEY,
    title TEXT,
    rule_title TEXT,
    rule_script TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 프로필 테이블 (사용자 정보)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    avatar_url TEXT,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 랭킹 테이블
CREATE TABLE public.rank (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    game_id INTEGER REFERENCES public.game(id) ON DELETE CASCADE,
    score INTEGER,
    end_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. 인덱스 생성 (성능 최적화)
DROP INDEX IF EXISTS idx_rank_user_game_date;
DROP INDEX IF EXISTS idx_rank_game_score;
DROP INDEX IF EXISTS idx_rank_end_time;
DROP INDEX IF EXISTS idx_profiles_updated_at;

CREATE INDEX idx_rank_user_game_date ON public.rank(user_id, game_id, end_time);
CREATE INDEX idx_rank_game_score ON public.rank(game_id, score DESC);
CREATE INDEX idx_rank_end_time ON public.rank(end_time);
CREATE INDEX idx_profiles_updated_at ON public.profiles(updated_at);

-- 3. 뷰 (VIEWS) 생성

-- 사용자 정보 뷰 (members)
CREATE OR REPLACE VIEW members AS
SELECT 
    u.id,
    u.email,
    p.full_name as name,
    p.avatar_url,
    p.created_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id;

-- 랭킹과 사용자 정보 조인 뷰 (rank_with_users)
CREATE OR REPLACE VIEW rank_with_users AS
SELECT 
    r.id,
    r.user_id,
    r.game_id,
    r.score,
    r.end_time,
    u.email,
    p.full_name as name,
    p.avatar_url
FROM public.rank r
LEFT JOIN auth.users u ON r.user_id = u.id
LEFT JOIN public.profiles p ON r.user_id = p.id;

-- 4. RLS (Row Level Security) 정책 설정

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

-- 5. 함수 (Functions) 및 트리거 생성

-- 프로필 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 기존 트리거들 삭제
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 프로필 업데이트 트리거
CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 사용자 생성 시 자동 프로필 생성 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_hash TEXT;
BEGIN
    -- 6자리 랜덤 해시 생성
    user_hash := substr(md5(random()::text || NEW.id::text), 1, 6);
    
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (
        NEW.id, 
        'user_' || user_hash,
        'https://api.dicebear.com/9.x/thumbs/svg?seed=' || user_hash
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 사용자 생성 트리거
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. RPC (Remote Procedure Call) 함수들

-- 일별 게임 통계 조회 함수
CREATE OR REPLACE FUNCTION get_daily_game_stats(p_game_id INTEGER, p_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(
    total_players BIGINT,
    avg_score NUMERIC,
    max_score INTEGER,
    min_score INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_players,
        AVG(r.score) as avg_score,
        MAX(r.score) as max_score,
        MIN(r.score) as min_score
    FROM public.rank r
    WHERE r.game_id = p_game_id
    AND DATE(r.end_time) = p_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 사용자 랭킹 조회 함수
CREATE OR REPLACE FUNCTION get_user_ranking(p_user_id UUID, p_game_id INTEGER, p_date DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(
    user_rank INTEGER,
    user_score INTEGER,
    total_players BIGINT,
    percentile NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH ranked_users AS (
        SELECT 
            r.user_id,
            r.score,
            ROW_NUMBER() OVER (ORDER BY r.score DESC) as rank,
            COUNT(*) OVER () as total_count
        FROM public.rank r
        WHERE r.game_id = p_game_id
        AND DATE(r.end_time) = p_date
    )
    SELECT 
        ru.rank::INTEGER as user_rank,
        ru.score as user_score,
        ru.total_count as total_players,
        (100.0 * (ru.total_count - ru.rank + 1) / ru.total_count) as percentile
    FROM ranked_users ru
    WHERE ru.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 리더보드 조회 함수
CREATE OR REPLACE FUNCTION get_leaderboard(p_game_id INTEGER, p_date DATE DEFAULT CURRENT_DATE, p_limit INTEGER DEFAULT 10)
RETURNS TABLE(
    rank INTEGER,
    user_id UUID,
    user_name TEXT,
    avatar_url TEXT,
    score INTEGER,
    end_time TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ROW_NUMBER() OVER (ORDER BY r.score DESC)::INTEGER as rank,
        r.user_id,
        p.full_name as user_name,
        p.avatar_url,
        r.score,
        r.end_time
    FROM public.rank r
    LEFT JOIN public.profiles p ON r.user_id = p.id
    WHERE r.game_id = p_game_id
    AND DATE(r.end_time) = p_date
    ORDER BY r.score DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 사용자 게임 기록 조회 함수
CREATE OR REPLACE FUNCTION get_user_game_history(p_user_id UUID, p_game_id INTEGER, p_days INTEGER DEFAULT 7)
RETURNS TABLE(
    play_date DATE,
    score INTEGER,
    rank INTEGER,
    total_players BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH daily_ranks AS (
        SELECT 
            DATE(r.end_time) as play_date,
            r.score,
            ROW_NUMBER() OVER (PARTITION BY DATE(r.end_time) ORDER BY r.score DESC) as rank,
            COUNT(*) OVER (PARTITION BY DATE(r.end_time)) as total_players
        FROM public.rank r
        WHERE r.game_id = p_game_id
        AND r.end_time >= CURRENT_DATE - INTERVAL '%s days' % p_days
    )
    SELECT 
        dr.play_date,
        dr.score,
        dr.rank::INTEGER,
        dr.total_players
    FROM daily_ranks dr
    JOIN public.rank r ON DATE(r.end_time) = dr.play_date AND r.score = dr.score
    WHERE r.user_id = p_user_id AND r.game_id = p_game_id
    ORDER BY dr.play_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. 기본 게임 데이터 삽입

INSERT INTO public.game (id, title, rule_title, rule_script) VALUES
(1, 'Llama vs Duck', 'Strategic Animal Placement', 'A strategic game where you are assigned either llamas or ducks and aim to fill the entire board with your assigned animals to win. Place your animals wisely to dominate the board!'),
(2, 'Greedy Bee', 'Honey Collection Challenge', 'Control a busy bee to collect as much money as possible! Navigate through obstacles and maximize your earnings in this fast-paced collection game.')
ON CONFLICT (id) DO NOTHING;

-- 8. 시퀀스 리셋 (게임 ID 시퀀스)
SELECT setval('game_id_seq', (SELECT MAX(id) FROM public.game), true);

-- 9. 권한 설정 (GRANTS)

-- 인증된 사용자에게 필요한 권한 부여
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT ON public.game TO authenticated;
GRANT SELECT, INSERT ON public.rank TO authenticated;
GRANT SELECT ON members TO authenticated;
GRANT SELECT ON rank_with_users TO authenticated;

-- RPC 함수 실행 권한
GRANT EXECUTE ON FUNCTION get_daily_game_stats TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_ranking TO authenticated;
GRANT EXECUTE ON FUNCTION get_leaderboard TO authenticated, anon;
GRANT EXECUTE ON FUNCTION get_user_game_history TO authenticated;

-- 익명 사용자에게는 게임 정보만 조회 가능
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.game TO anon;

COMMIT; 