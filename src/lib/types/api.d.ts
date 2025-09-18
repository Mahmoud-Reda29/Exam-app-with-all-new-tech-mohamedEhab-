declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessfulResponse<T>;
