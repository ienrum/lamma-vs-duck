-- 10-daily-games.sql
-- 일별 게임 데이터 테이블 생성

-- 기존 테이블이 있다면 삭제
DROP TABLE IF EXISTS public.daily_games CASCADE;

-- 일별 게임 데이터 테이블
CREATE TABLE public.daily_games (
    id SERIAL PRIMARY KEY,
    game_date DATE NOT NULL UNIQUE, -- 게임 날짜 (YYYY-MM-DD 형식)
    game_id INTEGER NOT NULL REFERENCES public.game(id) ON DELETE CASCADE, -- 게임 타입 참조
    difficulty INTEGER NOT NULL DEFAULT 5, -- 게임 난이도
    board_data JSONB NOT NULL, -- 게임 보드 데이터 (JSON 형태로 저장)
    reserved_animal_maps JSONB NOT NULL, -- 예약된 동물 맵 데이터
    who_is_win TEXT NOT NULL CHECK (who_is_win IN ('duck', 'lamma')), -- 승리 조건
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 인덱스 생성
CREATE INDEX idx_daily_games_game_date ON public.daily_games (game_date);
CREATE INDEX idx_daily_games_game_id_date ON public.daily_games (game_id, game_date);

-- RLS 활성화
ALTER TABLE public.daily_games ENABLE ROW LEVEL SECURITY;

-- 기존 RLS 정책들 삭제 (있다면)
DROP POLICY IF EXISTS "Anyone can view daily games" ON public.daily_games;
DROP POLICY IF EXISTS "Service role can manage daily games" ON public.daily_games;

-- RLS 정책 생성
-- 모든 사용자가 일별 게임 데이터를 조회할 수 있음
CREATE POLICY "Anyone can view daily games" ON public.daily_games
    FOR SELECT USING (true);

-- 서비스 역할(API)에서만 일별 게임 데이터를 생성/수정할 수 있음
-- 실제로는 API에서 서버 사이드 클라이언트를 사용하므로 이 정책으로 충분
CREATE POLICY "Service role can manage daily games" ON public.daily_games
    FOR ALL USING (true);

-- 주석 추가
COMMENT ON TABLE public.daily_games IS '일별 게임 데이터를 저장하는 테이블';
COMMENT ON COLUMN public.daily_games.game_date IS '게임 날짜 (해당 날짜의 모든 플레이어가 동일한 게임을 플레이)';
COMMENT ON COLUMN public.daily_games.board_data IS '게임 보드 초기 상태 데이터 (JSON)';
COMMENT ON COLUMN public.daily_games.reserved_animal_maps IS '예약된 동물 맵 데이터 (JSON)';
COMMENT ON COLUMN public.daily_games.who_is_win IS '승리 조건: duck 또는 lamma'; 