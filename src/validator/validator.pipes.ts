import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationExeption } from './validator.exeption';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);

    const errors = await validate(obj);

    if (errors.length > 0) {
      const response = {
        id: 0,
        error: true,
        errors: [],
      };

      for (let err of errors) response.errors.push({ [err.property]: [`${Object.values(err.constraints).join(', ')}`] });

      throw new ValidationExeption(response);
    }
    return value;
  }
}
