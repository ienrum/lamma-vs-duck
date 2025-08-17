-- 03-views.sql
-- 뷰 생성
-- Lamma vs Duck 게임 데이터베이스

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