export function generateGameData(difficulty: number) {
  const BOARD_SIZE = 4; // 4x4 보드
  const RESERVED_MAP_SIZE = 3; // 각 방향별로 3개의 예약 타일 리스트

  // 난이도에 따른 라마와 오리의 비율 조정
  const lamaRatio = 0.5 + (difficulty - 1) * 0.005; // 난이도 1: 0.5, 난이도 10: 0.75
  const duckRatio = 1 - lamaRatio;

  // 보드 초기화 (4x4)
  const board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    const row = [];
    for (let j = 0; j < BOARD_SIZE; j++) {
      const rand = Math.random();
      if (rand < lamaRatio) {
        row.push("2"); // 라마
      } else if (rand < lamaRatio + duckRatio) {
        row.push("1"); // 오리
      } else {
        row.push("0"); // 빈 칸
      }
    }
    board.push(row);
  }

  // 예약된 동물 맵 초기화 (각 방향별로 3개 리스트)
  const reservedAnimalMaps = {
    up: [],
    down: [],
    left: [],
    right: [],
  } as Record<string, string[][]>;

  for (let dir in reservedAnimalMaps) {
    for (let k = 0; k < RESERVED_MAP_SIZE; k++) {
      const tileList: string[] = [];
      for (let i = 0; i < BOARD_SIZE; i++) {
        const rand = Math.random();
        if (rand < lamaRatio) {
          tileList.push("2"); // 라마
        } else if (rand < lamaRatio + duckRatio) {
          tileList.push("1"); // 오리
        } else {
          tileList.push("0"); // 빈 칸
        }
      }
      reservedAnimalMaps[dir as keyof typeof reservedAnimalMaps].push(tileList);
    }
  }

  // 생성된 데이터 반환
  return {
    board,
    reservedAnimalMaps,
  };
}
