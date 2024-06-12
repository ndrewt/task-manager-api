import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsNumberString, IsObject, IsOptional, IsString } from 'class-validator';

export class GetProjectList {
  @ApiProperty({ example: 1, required: false, description: 'default 1' })
  @IsOptional()
  @IsNumberString({}, { message: 'Must be integer' })
  readonly page: string;

  @ApiProperty({ example: 10, required: false, description: 'default 10' })
  @IsOptional()
  @IsNumberString({}, { message: 'Must be integer' })
  readonly per_page: number;
}
