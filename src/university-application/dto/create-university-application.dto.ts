import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateUniversityApplicationDto {
  // 지원자 아이디
  @ApiProperty({ description: '사용자아이디' })
  @IsString()
  @IsNotEmpty()
  applicantUserId: string;

  // 대학 JSONB (배열로 구성)
  @ApiProperty({ description: '대학 지원서', type: Array, example: [{ universityId: 'universityId', name: 'name', logo: 'logo', department: 'department', admission: 'admission', applicationType: { isEarlyDecision: true, isRegularDecision: true }, isAdmitted: 'none' }] })
  @IsArray()
  @IsNotEmpty()
  university: Array<{
    universityId: string; // 이 부분은 생성 시에 추가할 수 있습니다.
    name: string;
    logo: string;
    // 학과 및 전형
    department: string; 
    admission: string;
    // 수시 / 정시 구분
    applicationType: {
      isEarlyDecision: boolean;
      isRegularDecision: boolean;
    };

    // 합격 여부 - 기본값은 none
    isAdmitted: string;
  }>;
}
