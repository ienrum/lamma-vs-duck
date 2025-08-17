-- 05-functions.sql
-- 함수 생성
-- Lamma vs Duck 게임 데이터베이스

-- 프로필 업데이트 시간 자동 갱신 함수
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

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