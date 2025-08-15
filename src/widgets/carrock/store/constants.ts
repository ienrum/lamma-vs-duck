export const CARROCK_CONSTANTS = {
  // 자동차 관련
  CAR_SPEED: {
    INITIAL: 120,
    MAX: 180,
    INCREASE: 2,
  },
  CAR_ROTATION_SPEED: 3,
  CAR_EMOJI: {
    SIZE: '24px',
    SYMBOL: '🚕',
  },

  // 오토바이 관련
  MOTORCYCLE_SPEED: {
    INITIAL: 80,
    MAX: 120,
    INCREASE: 2,
  },
  MOTORCYCLE_SPAWN: {
    INITIAL_INTERVAL: 2000,
    MIN_INTERVAL: 1000,
    INTERVAL_DECREASE: 50,
  },
  MOTORCYCLE_EMOJI: {
    SIZE: '24px',
    SYMBOL1: '🏍️',
    SYMBOL2: '🛵',
    SYMBOL3: '🛴',
    SYMBOL4: '🛺',
  },

  // 게임 상태 관련
  HEALTH: {
    INITIAL: 100,
    MAX: 100,
    COLLISION_DAMAGE: 20,
  },
  SCORE: {
    INITIAL: 0,
    TIME_POINTS: 1, // 1초당 1점
    DISTANCE_POINTS: 1, // 거리 기반 점수
  },

  // 타이어 자국 관련
  TIRE_TRAIL: {
    MAX_LENGTH: 100,
    UPDATE_INTERVAL: 50,
    FADE_DURATION: 5000, // 5초 후 사라짐
    WIDTH: 2,
    COLOR: 0x444444,
  },

  // 기타
  COLLISION_COOLDOWN: 1000,
  DIFFICULTY_INCREASE_INTERVAL: 10000, // 10초마다 난이도 증가

  BACKGROUND: {
    // 밝은 흙색
    COLOR: 0xe0c097,
    GRID_SIZE: 50,
    GRID_COLOR: 0xffffff,
    GRID_ALPHA: 0.3,
  },
} as const;
