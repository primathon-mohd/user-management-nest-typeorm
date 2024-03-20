import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'User name field',
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

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    enum: ['super-admin', 'admin', 'user'],
    required: false,
    default: 'user',
  })
  role: TypeRole;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Age of User',
    required: false,
    type: 'number',
    // type: Number,
    minimum: 18,
    maximum: 60,
  })
  age: number;
}
