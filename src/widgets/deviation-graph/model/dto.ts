export interface DeviationGraphDto {
  time: number;
  value: number;
}

export interface DeviationGraphResponseDto {
  timeData: DeviationGraphDto[];
  myTime: number;
  total: number;
}
