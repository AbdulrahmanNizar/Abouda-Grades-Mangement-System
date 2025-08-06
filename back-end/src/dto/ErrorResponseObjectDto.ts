export class ErrorResponseObjectDto {
  readonly errorMessage: string;
  readonly statusCode: number;
  readonly data?: any;
}
