-- 08-data.sql
-- 기본 데이터 삽입
-- Lamma vs Duck 게임 데이터베이스

-- 기본 게임 데이터 삽입
INSERT INTO public.game (id, title, "ruleTitle", "ruleScript") VALUES
(1, 'Llama vs Duck', 'Strategic Animal Placement', 'A strategic game where you are assigned either llamas or ducks and aim to fill the entire board with your assigned animals to win. Place your animals wisely to dominate the board!'),
(2, 'Greedy Bee', 'Honey Collection Challenge', 'Control a busy bee to collect as much money as possible! Navigate through obstacles and maximize your earnings in this fast-paced collection game.'),
(3, 'Carrock', 'Ski Tree Racing', 'A thrilling racing game inspired by ski tree slalom! Touch to change direction, avoid rock obstacles, and leave tire tracks behind. Navigate through the rocky terrain and achieve the highest score!')
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    "ruleTitle" = EXCLUDED."ruleTitle",
    "ruleScript" = EXCLUDED."ruleScript";

-- 시퀀스 리셋 (게임 ID 시퀀스)
SELECT setval('game_id_seq', (SELECT MAX(id) FROM public.game), true); 