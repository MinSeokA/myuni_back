import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;
  // 이름
  @Column()
  name: string;
  // 이메일
  @Column()
  email: string;
  // 사진
  @Column()
  photo: string;

  // 사용자 정의 URL - 유니크 
  @Column({ unique: true })
  customUrl: string; 

  // 수시 지원 공개 여부
  @Column({ default: false })
  isEarlyDecision: boolean;

  // 정시 지원 공개 여부
  @Column({ default: false })
  isRegularDecision: boolean;

  // 합격/불합격 공개 여부
  @Column({ default: false })
  isAdmissionResult: boolean;
}