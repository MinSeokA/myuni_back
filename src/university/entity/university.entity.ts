import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("universities")
export class University {
  @PrimaryGeneratedColumn()
  id: number;

  // 대학 이름
  @Column()
  name: string;

  // 대학 로고
  @Column()
  logo: string;
}
