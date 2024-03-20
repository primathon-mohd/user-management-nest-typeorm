import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class StudentDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'student id field',
    required: false,
    type: 'string',
  })
  stud_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'name field',
    required: true,
    type: 'string',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'permanent address field',
    required: false,
    type: 'string',
  })
  permanent_address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'current address field',
    required: true,
    type: 'string',
    default: 'SAME AS PERMANENT ADDRESS',
  })
  current_address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'mobile number field',
    required: true,
    type: 'string',
  })
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'email address field',
    required: false,
    type: 'email',
  })
  emailId: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'date of birth field',
    required: false,
    type: 'date',
  })
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    description: 'date of admission field',
    required: false,
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateOfAdmission: Date;
}
