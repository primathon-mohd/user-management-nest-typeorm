import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
