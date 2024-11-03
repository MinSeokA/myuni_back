import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface ApplicationType {
  isEarlyDecision: boolean;
  isRegularDecision: boolean;
}

interface University {
  universityId: string;
  name: string;
  logo: string;
  department: string; 
  admission: string;
  applicationType: ApplicationType;

  // 합격 여부 - 기본값은 none
  isAdmitted: string;
}

@Entity('university-applications')
export class UniversityApplication {
  @PrimaryGeneratedColumn()
  id: number;

  // 지원자 아이디
  @Column()
  applicantUserId: string;

  // 대학 JSONB
  @Column('jsonb')
  university: University[]; // 명확한 타입 사용
}
