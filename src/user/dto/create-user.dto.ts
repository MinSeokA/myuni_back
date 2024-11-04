import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '사용자 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '사용자 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: '사용자 아이디' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: '수시 표시 여부' })
  @IsBoolean()
  isEarlyDecision: boolean;


  @ApiProperty({ description: '정시 표시 여부' })
  @IsBoolean()
  isRegularDecision: boolean;

  @ApiProperty({ description: '합격 표시 여부' })
  @IsBoolean()
  isAdmissionResult: boolean;
}