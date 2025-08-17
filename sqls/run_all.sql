-- run_all.sql
-- 라마 vs 덕 게임 데이터베이스 복구 - 전체 실행 스크립트
-- 모든 SQL 파일을 순서대로 실행합니다.

-- 1. 테이블 생성
\i 01-tables.sql

-- 2. 인덱스 생성
\i 02-indexes.sql

-- 3. 뷰 생성
\i 03-views.sql

-- 4. RLS 정책 설정
\i 04-rls.sql

-- 5. 함수 생성
\i 05-functions.sql

-- 6. 트리거 생성
\i 06-triggers.sql

-- 7. RPC 함수들 생성 (선택사항 - 현재 API에서 사용하지 않음)
-- 필요시 아래 주석을 해제하세요
-- \i 07-rpc.sql

-- 8. 기본 데이터 삽입
\i 08-data.sql

-- 9. 권한 설정
\i 09-permissions.sql

-- 완료 메시지
SELECT 'Database restoration completed successfully!' as status;
SELECT 'Note: RPC functions were skipped (not currently used by API)' as info; 