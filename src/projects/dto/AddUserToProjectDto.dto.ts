import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class AddUserToProjectDto {
  @IsString({ message: 'Must be string value' })
  @ApiProperty({ example: '66698803c639c7c822bfd62a', required: true, description: 'Project id to delete' })
  readonly id: string;

  @IsString({ message: 'Must be string value' })
  @ApiProperty({ example: '66698803c639c7c822bfd62a', required: true, description: 'Project id to delete' })
  readonly userId: string;
}
