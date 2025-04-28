export const GAME_CONSTANTS = {
  // 플레이어 관련
  PLAYER_SPEED: {
    INITIAL: 150,
    MAX: 170,
    INCREASE: 2,
  },
  PLAYER_ROTATION_SPEED: 4,
  PLAYER_EMOJI: {
    SIZE: '24px',
  },

  // 적 관련
  ENEMY_SPEED: {
    INITIAL: 160,
    MAX: 200,
    INCREASE: 2,
  },
  ENEMY_SPAWN: {
    INITIAL_INTERVAL: 7000,
    MIN_INTERVAL: 3000,
    INTERVAL_DECREASE: 400,
  },
  ENEMY_FOLLOW: {
    DISTANCE: 20,
    SMOOTH_FACTOR: 0.05,
    MIN_DISTANCE: 20,
  },
  ENEMY_EMOJI: {
    SIZE: '24px',
  },

  // 게임 상태 관련
  HEALTH: {
    INITIAL: 100,
    MAX: 100,
    TAIL_DAMAGE: 10,
  },
  SCORE: {
    INITIAL: 0,
    COLLISION_POINTS: 10,
  },

  // 기타
  EARTHQUAKE: {
    DURATION: 200, // 진동 지속 시간 (밀리초)
    INTENSITY: 5, // 진동 강도 (0-100)
  },
  TRANSITION_DURATION: 500,
  COLLISION_COOLDOWN: 1000,
  PATH: {
    MAX_LENGTH: 15,
    UPDATE_INTERVAL: 50,
  },
  HEART: {
    SPAWN_INTERVAL: 10000,
    HEAL_AMOUNT: 10,
    EMOJI_SIZE: '36px',
  },
  BACKGROUND: {
    PATTERN_SIZE: '40px',
  },
} as const;
