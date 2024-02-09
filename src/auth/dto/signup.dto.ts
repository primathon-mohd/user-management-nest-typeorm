import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeRole } from 'src/entity/user.abstract.entity';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  role: TypeRole;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
