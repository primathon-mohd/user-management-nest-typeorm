import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  roles: string;
}
