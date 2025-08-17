-- 06-triggers.sql
-- 트리거 생성
-- Lamma vs Duck 게임 데이터베이스

-- 기존 트리거들 삭제
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 프로필 업데이트 트리거
CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 사용자 생성 트리거
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 