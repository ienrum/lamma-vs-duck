import { todayString } from "@/src/shared/config/today-string";

export interface GameData {
  date: string; // YYYY-MM-DD 형식
  board: string[][];
  reservedAnimalMaps: {
    up: string[][];
    down: string[][];
    left: string[][];
    right: string[][];
  };
  whoIsWin: string;
}

// 메모리에 저장할 게임 데이터
let dailyGameData: GameData | null = null;
let lastGeneratedDate: string | null = null;

export const getDailyGameData = () => {
  const today = todayString();

  // 오늘 날짜의 데이터가 없거나 마지막 생성 날짜가 오늘이 아닌 경우
  if (!dailyGameData || lastGeneratedDate !== today) {
    return null;
  }

  return dailyGameData;
};

export const setDailyGameData = (data: GameData) => {
  dailyGameData = data;
  lastGeneratedDate = data.date;
}; 