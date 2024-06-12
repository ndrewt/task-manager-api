import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class AddTaskDto {
  @ApiProperty({ example: 'Test Taks', description: 'name of task' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly name: string;

  @ApiProperty({ example: 'task for testing task manager service', description: 'description of task' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 2000, { message: 'Length must contain min 1 or max 2000 symbols' })
  description: string;

  @ApiProperty({ example: 'new', description: 'new | in_process | completed' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  @IsIn(['new', 'in_process', 'completed'], { message: 'Status must be one of: new, in_process, completed' })
  status: string;

  @IsString({ message: 'Must be string value' })
  @ApiProperty({ example: '66698803c639c7c822bfd62a', required: true, description: 'Project id to delete' })
  readonly projectId: string;
}
