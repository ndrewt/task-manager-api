import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsInt, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Length } from 'class-validator';

export class LoginUseryDto {
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
