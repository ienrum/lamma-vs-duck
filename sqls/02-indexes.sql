-- 02-indexes.sql
-- 인덱스 생성 (성능 최적화)
-- Lamma vs Duck 게임 데이터베이스

-- 기존 인덱스들 삭제
DROP INDEX IF EXISTS idx_rank_user_game_date;
DROP INDEX IF EXISTS idx_rank_game_score;
DROP INDEX IF EXISTS idx_rank_end_time;
DROP INDEX IF EXISTS idx_profiles_updated_at;

-- 새 인덱스들 생성
CREATE INDEX idx_rank_user_game_date ON public.rank(user_id, game_id, end_time);
CREATE INDEX idx_rank_game_score ON public.rank(game_id, score DESC);
CREATE INDEX idx_rank_end_time ON public.rank(end_time);
CREATE INDEX idx_profiles_updated_at ON public.profiles(updated_at); 