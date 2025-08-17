-- 07-rpc.sql
-- RPC (Remote Procedure Call) 함수들
-- Lamma vs Duck 게임 데이터베이스

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