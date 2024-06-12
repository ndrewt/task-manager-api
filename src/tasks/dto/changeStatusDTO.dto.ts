import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn } from 'class-validator';

export class ChangeStatusDto {
  @ApiProperty({ example: '66698803c639c7c822bfd62a', description: 'Task ID' })
  @IsString({ message: 'Must be string value' })
  readonly id: string;

  @ApiProperty({ example: 'new', description: 'new | in_process | completed' })
  @IsString({ message: 'Must be string value' })
  @IsIn(['new', 'in_process', 'completed'], { message: 'Status must be one of: new, in_process, completed' })
  readonly status: string;
}