import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetTaskListDto {
  @ApiProperty({ example: 1, required: false, description: 'Default: 1' })
  @IsOptional()
  @IsNumberString({}, { message: 'Must be integer' })
  readonly page?: string;

  @ApiProperty({ example: 10, required: false, description: 'Default: 10' })
  @IsOptional()
  @IsNumberString({}, { message: 'Must be integer' })
  readonly per_page?: number;

  @ApiProperty({ example: 'new', required: false, description: 'Filter tasks by status' })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly status?: string;

  @ApiProperty({ example: '66698803c639c7c822bfd62a', required: false, description: 'Filter tasks by projectId' })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly projectId?: string;

  @ApiProperty({
    example: 'date_add',
    required: false,
    description: 'Sort tasks by field (date_add, date_update, status, projectId, _id, name, description)',
    enum: ['date_add', 'date_update', 'status', 'projectId', '_id', 'name', 'description'],
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @IsEnum(['date_add', 'date_update', 'status', 'projectId', '_id', 'name', 'description'], { message: 'Invalid sorting field' })
  readonly sortBy?: string;

  @ApiProperty({
    example: 'desc',
    required: false,
    description: 'Sort order (asc, desc)',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  @IsEnum(SortOrder, { message: 'Invalid sort order' })
  readonly sortOrder?: SortOrder;
}
