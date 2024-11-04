import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUniversityDto {

  @ApiProperty({ description: '대학 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '대학 로고' })
  @IsString()
  @IsOptional()
  logo: string;
}