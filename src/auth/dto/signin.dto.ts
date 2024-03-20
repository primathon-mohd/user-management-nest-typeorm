import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username field',
    required: false,
    type: 'string',
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email field',
    required: true,
    type: 'email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Password field',
    required: true,
    type: 'string',
  })
  password: string;
}
