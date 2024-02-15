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
  stud_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  permanent_address: string;

  @IsNotEmpty()
  @IsString()
  current_address: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  emailId: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsDateString()
  @IsOptional()
  dateOfAdmission: Date;
}
