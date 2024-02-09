import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisteredUser } from 'src/entity/registered.user.entity';

export class PermissionDto {
  @IsNotEmpty()
  @IsArray()
  url: string[];

  @IsNotEmpty()
  @IsString()
  httpVerb: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  user: RegisteredUser;
}
