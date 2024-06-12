import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsString, Length } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'Andrew', description: 'firstName value' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly firstName: string;

  @ApiProperty({ example: 'Kovalskiy', description: 'LastName value' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly LastName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'email value' })
  @IsString({ message: 'Must be string value' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  readonly email: string;

  @ApiProperty({ example: '12345678TeStP@ss', description: 'password value' })
  @IsString({ message: 'Must be string value' })
  @Length(1, 255, { message: 'Length must contain min 1 or max 255 symbols' })
  password: string;
}
