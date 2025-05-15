interface ErrorResponseDto {
  status: 'error';
  data: null;
  error: string;
}

interface SuccessResponseDto<T> {
  status: 'success';
  data: T;
  error: null;
}

export type BaseResponseDto<T> = ErrorResponseDto | SuccessResponseDto<T>;
