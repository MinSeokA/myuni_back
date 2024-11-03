import { Injectable } from '@nestjs/common';
import { UniversityApplication } from './entity/university-application.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUniversityApplicationDto } from './dto/create-university-application.dto';

@Injectable()
export class UniversityApplicationService {
  constructor(
    @InjectRepository(UniversityApplication)
    private readonly universityApplicationRepository: Repository<UniversityApplication>,
  ) {}

  // 대학 지원서 생성
  async create(universityApplicationDto: CreateUniversityApplicationDto) {
    // 오류처리
    if (!universityApplicationDto) {
      return {
        success: false,
        message: '대학 지원서를 생성할 수 없습니다.',
      };
    }

    // university가 배열인지 확인
    if (
      !universityApplicationDto.university ||
      !Array.isArray(universityApplicationDto.university)
    ) {
      return {
        success: false,
        message: '대학 정보가 유효하지 않습니다.',
      };
    }

    // 지원서가 이미 있는 경우, 기존 지원서 업데이트
    const existingApplication =
      await this.universityApplicationRepository.findOne({
        where: { applicantUserId: universityApplicationDto.applicantUserId },
      });

    if (existingApplication) {
      // 이미 지원서가 존재하는 경우, 대학 정보를 배열에 추가
      const newUniversities = universityApplicationDto.university.map((u) => ({
        ...u,
        universityId: this.generateRandomString(8), // 랜덤으로 생성한 universityId 추가
        isAdmitted: 'none', // 합격 여부 초기값
      }));

      // 기존 대학 정보와 중복 확인 후 추가
      existingApplication.university = [
        ...existingApplication.university,
        ...newUniversities,
      ];

      await this.universityApplicationRepository.save(existingApplication);
      return {
        success: true,
        message: '대학 지원서가 성공적으로 업데이트되었습니다.',
        data: existingApplication,
      };
    }

    // 랜덤 문자열 생성 (예: 8자리)
    const universityId = this.generateRandomString(8);

    // 새로운 지원서 객체 생성
    const universityApplication = this.universityApplicationRepository.create({
      applicantUserId: universityApplicationDto.applicantUserId,
      university: universityApplicationDto.university.map((u) => ({
        ...u,
        universityId, // 랜덤으로 생성한 universityId 추가
        isAdmitted: 'none', // 합격 여부 초기값
      })),
    });

    return await this.universityApplicationRepository.save(
      universityApplication,
    );
  }

  // 랜덤 문자열 생성 메서드
  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  // 해당 사용자의 대학 지원서 리스트
  async findAll(userId: string) {
    return this.universityApplicationRepository.find({
      where: { applicantUserId: userId },
    });
  }

// 대학 지원서 ID로 삭제
async remove(id: string) {
  // ID로 대학 지원서를 직접 검색
  const universityApplication = await this.universityApplicationRepository.findOne({
    where: { university: { universityId: id } }, // ID로 직접 검색
  });

  // 대학 지원서가 존재하지 않으면 에러 처리
  if (!universityApplication) {
    return {
      success: false,
      message: '해당 대학 지원서를 찾을 수 없습니다.',
    };
  }

  // 대학 지원서 삭제
  await this.universityApplicationRepository.remove(universityApplication);

  return {
    success: true,
    message: '대학 지원서가 성공적으로 삭제되었습니다.',
  };
}

  // 대학 지원서 업데이트
  async update(
    applicantUserId: string,
    universityId: string,
    updateData: Partial<CreateUniversityApplicationDto['university'][0]>,
  ) {
    // 지원서 조회
    const existingApplication =
      await this.universityApplicationRepository.findOne({
        where: { applicantUserId },
      });

    if (!existingApplication) {
      return {
        success: false,
        message: '해당 지원서를 찾을 수 없습니다.',
      };
    }

    // 해당 universityId에 해당하는 대학 정보 찾기
    const universityIndex = existingApplication.university.findIndex(
      (u) => u.universityId === universityId,
    );

    if (universityIndex === -1) {
      return {
        success: false,
        message: '해당 대학 정보가 존재하지 않습니다.',
      };
    }

    // 대학 정보 업데이트
    existingApplication.university[universityIndex] = {
      ...existingApplication.university[universityIndex],
      ...updateData,
    };

    // 업데이트된 지원서 저장
    await this.universityApplicationRepository.save(existingApplication);

    return {
      success: true,
      message: '대학 지원서가 성공적으로 업데이트되었습니다.',
      data: existingApplication,
    };
  }
}
