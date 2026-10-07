import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  student_id: string;

  @IsString()
  @IsNotEmpty()
  class_name: string;

  @IsOptional()
  @IsString()
  github_link?: string;

  @IsOptional()
  @IsString()
  figma_link?: string;

  @IsOptional()
  @IsString()
  postman_link?: string;

  @IsOptional()
  @IsString()
  pdf_link?: string;
}
