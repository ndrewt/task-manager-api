import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class AddProjectDto {
  @ApiProperty({ example: 'Test Project', description: 'name of project' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly name: string;

  @ApiProperty({ example: 'Project for testing task manager service', description: 'description of project' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 2000, { message: 'Length must contain min 1 or max 2000 symbols' })
  description: string;
}
