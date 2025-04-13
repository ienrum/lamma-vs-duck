const printBoard = (board: string[][]) => {
  console.log(board.map(row => row.join(" ")).join("\n"));
}

const shuffleBoard = (board: string[][]) => {
  const shuffledBoard = board.map(row => row.sort(() => Math.random() - 0.5));
  return shuffledBoard;
}

export function generateGameData(difficulty: number) {
  const BOARD_SIZE = 3; // 4x4 보드
  const SAME_COUNT = 2;
  const [lammaPercent, duckPercent] = [0.05, 0.2].sort(() => Math.random() - 0.5);

  // 초기 보드 (고정된 패턴)
  let answerBoard: string[][] = [
    ["1", "0", "2"],
    ["1", "2", "2"],
    ["1", "1", "2"],
  ];

  answerBoard = shuffleBoard(answerBoard);

  const shiftAndPushListInBoard = (board: string[][], direction: "up" | "down" | "left" | "right", newList: string[]) => {
    const newBoard = [...board];
    let shiftedList: string[] = [];

    if (direction === "up") {
      const firstRow = newBoard.shift()!;
      shiftedList = [...firstRow]
      newBoard.push([...newList]);
    } else if (direction === "down") {
      const lastRow = newBoard.pop()!;
      shiftedList = [...lastRow]
      newBoard.unshift([...newList]);
    } else if (direction === "left") {
      for (let i = 0; i < newBoard.length; i++) {
        const shiftedCell = newBoard[i].shift()!;
        newBoard[i].push(newList[i]);
        shiftedList.push(shiftedCell);
      }
    } else if (direction === "right") {
      for (let i = 0; i < newBoard.length; i++) {
        const shiftedCell = newBoard[i].pop()!;
        newBoard[i].unshift(newList[i]);
        shiftedList.push(shiftedCell);
      }
    }
    return { newBoard, shiftedList };
  }

  const isSameCountInBoard = (board: string[][]) => {
    const lammaTileCount = board.reduce((acc, row) => acc + row.filter(item => item === "2").length, 0);
    const duckTileCount = board.reduce((acc, row) => acc + row.filter(item => item === "1").length, 0);
    return lammaTileCount === duckTileCount;
  }

  const generateRandomReservedAnimalList = () => {

    const reservedAnimalList = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const random = Math.random();
      if (random < lammaPercent) {
        reservedAnimalList.push("2");
      } else if (random < duckPercent) {
        reservedAnimalList.push("1");
      } else {
        reservedAnimalList.push("0");
      }
    }
    return reservedAnimalList;
  }

  const copyBoard = (board: string[][]) => {
    const newBoard = [];
    for (let i = 0; i < board.length; i++) {
      newBoard.push([...board[i]]);
    }
    return newBoard;
  }

  const oppositeDirection = (direction: "up" | "down" | "left" | "right"): "up" | "down" | "left" | "right" => {
    return {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    }[direction] as "up" | "down" | "left" | "right";
  }
  // 예약된 동물 맵 초기화 (각 방향별로 3개 리스트)
  const reservedAnimalMaps = {
    up: [],
    down: [],
    left: [],
    right: [],
  } as Record<"up" | "down" | "left" | "right", string[][]>;

  let cnt = 0
  const directionList = ["up", "down", "left", "right"] as const;

  let tempBoard = copyBoard(answerBoard);

  printBoard(tempBoard);
  while (cnt < difficulty) {
    const direction = directionList[Math.floor(Math.random() * 4)];
    const reservedAnimalList = generateRandomReservedAnimalList();
    const newBoard = shiftAndPushListInBoard(tempBoard, direction, reservedAnimalList);
    if (isSameCountInBoard(newBoard.newBoard)) {
      continue;
    }
    printBoard(newBoard.newBoard);
    reservedAnimalMaps[oppositeDirection(direction)].unshift([...newBoard.shiftedList]);
    tempBoard = copyBoard(newBoard.newBoard);
    cnt++;
  }
  // 생성된 데이터 반환
  return {
    board: tempBoard,
    reservedAnimalMaps,
  };
}
