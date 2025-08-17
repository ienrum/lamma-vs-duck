-- 09-permissions.sql
-- 권한 설정 (GRANTS)
-- Lamma vs Duck 게임 데이터베이스

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