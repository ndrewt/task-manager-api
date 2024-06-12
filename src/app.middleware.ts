import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class Requestiddleware implements NestMiddleware {
  constructor() {}
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error('Method not implemented.');
  }
}
