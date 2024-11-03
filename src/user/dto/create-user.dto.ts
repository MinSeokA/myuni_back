import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsBoolean()
  isEarlyDecision: boolean;

  @IsBoolean()
  isRegularDecision: boolean;

  @IsBoolean()
  isAdmissionResult: boolean;
}