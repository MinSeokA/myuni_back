import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  logo: string;
}