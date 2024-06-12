import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ example: '66698803c639c7c822bfd62a', description: 'id of task' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly id: string;

  @ApiProperty({ example: 'Test Taks', description: 'name of task' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  @IsOptional()
  readonly name: string;

  @ApiProperty({ example: 'task for testing task manager service', description: 'description of task' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 2000, { message: 'Length must contain min 1 or max 2000 symbols' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'Test task', description: 'name of task' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  @IsOptional()
  @IsIn(['new', 'in_process', 'completed'], { message: 'Status must be one of: new, in_process, completed' })
  status: string;

  @ApiProperty({ example: ['66698803c639c7c822bfd622', '66698803c639c7c822bfd62a'], description: 'array of users' })
  @IsArray()
  @IsOptional()
  users: string[];

  @IsString({ message: 'Must be string value' })
  @IsOptional()
  @ApiProperty({ example: '66698803c639c7c822bfd62a', required: true, description: 'task id to delete' })
  readonly projectId: string;
}
