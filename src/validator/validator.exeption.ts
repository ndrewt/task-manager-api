import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationExeption extends HttpException {
  constructor(response: { user?: {}; token?: string; id?: number | string; rows?: object; error: boolean; error_code?: string; errors: object[] | string[] }, status?: number) {
    super(response, status | HttpStatus.BAD_REQUEST);
  }
}
