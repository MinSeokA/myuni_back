import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './entity/university.entity';
import { Repository } from 'typeorm';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { CreateUniversityDto } from './dto/create-university.dto';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepository: Repository<University>,
  ) {}

  // 대학 생성
  async create(university: CreateUniversityDto): Promise<University> {
    return await this.universityRepository.save(university);
  }

  // 대학 업데이트
  async update(university: UpdateUniversityDto): Promise<University> {
    const existingUniversity = await this.universityRepository.findOne({
      where: { name: university.name },
    });
    if (!existingUniversity) {
      return null;
    }

    const updatedUniversity = this.universityRepository.merge(existingUniversity, university);
    return await this.universityRepository.save(updatedUniversity);
  }

  // 대학 삭제
  async delete(name: string): Promise<void> {
    await this.universityRepository.delete(name);
  }

  // 대학 리스트
  async findAll(): Promise<University[]> {
    return await this.universityRepository.find();
  }
}
