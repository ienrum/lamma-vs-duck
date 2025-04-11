export interface BaseDto {
  message: string;
}

export interface BaseResponseDto<T> extends BaseDto {
  data: T;
}