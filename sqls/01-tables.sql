-- 01-tables.sql
-- 테이블 생성
-- Lamma vs Duck 게임 데이터베이스

-- 기존 테이블들 삭제 (의존성 순서대로)
DROP TABLE IF EXISTS public.rank CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;  
DROP TABLE IF EXISTS public.game CASCADE;

-- 게임 테이블
CREATE TABLE public.game (
    id SERIAL PRIMARY KEY,
    title TEXT,
    "ruleTitle" TEXT,
    "ruleScript" TEXT,
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