import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class UpdateProjectDto {
  @ApiProperty({ example: '66698803c639c7c822bfd62a', description: 'id of project' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly id: string;

  @ApiProperty({ example: 'Test Project', description: 'name of project' })
  @IsString({ message: 'Must be string value' })
  @IsOptional()
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly name: string;

  @ApiProperty({ example: 'Project for testing task manager service', description: 'description of project' })
  @IsString({ message: 'Must be string value' })
  @IsOptional()
  @Length(1, 2000, { message: 'Length must contain min 1 or max 2000 symbols' })
  readonly description: string;

  @ApiProperty({ example: ['66698803c639c7c822bfd622', '66698803c639c7c822bfd62a'], description: 'array of users' })
  @IsArray()
  @IsOptional()
  users: string[];
}
