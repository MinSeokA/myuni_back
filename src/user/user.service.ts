import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Result, fail, success } from '../utils/result';
import { UpdateUserDto } from './dto/update-user.dto';
import { UniversityApplicationService } from '../university-application/university-application.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    private readonly universityApplicationService: UniversityApplicationService,

  ) {}

  // 사용자 생성
  async create(user: CreateUserDto): Promise<Result<User>> {
    // 사용자 찾기
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (existingUser) {
      return fail('이미 존재하는 사용자입니다.');
    }

    // 사용자 생성
    const createUser = await this.userRepository.save(user);

    return success('사용자가 성공적으로 생성되었습니다.', createUser);
  }

  // 사용자 업데이트
  async update(user: UpdateUserDto): Promise<Result<User>> {
    // 사용자 찾기
    const existingUser = await this.userRepository.findOne({
      where: { userId: user.userId },
    });
    if (!existingUser) {
      return fail('사용자를 찾을 수 없습니다.');
    }

    // 업데이트된 사용자 정보를 병합 후 저장
    const updatedUser = this.userRepository.merge(existingUser, user);
    await this.userRepository.save(updatedUser);

    return success('사용자가 성공적으로 업데이트되었습니다.', updatedUser);
  }

  // 사용자 찾기
  async findOne(userId: string): Promise<Result<User>> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      return fail('사용자를 찾을 수 없습니다.');
    }
  
    return success('사용자를 찾았습니다.', user);
  }

  // 사용자 찾기 / 이메일
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  // 사용자 삭제
  async remove(userId: string): Promise<Result<User>> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      return fail('사용자를 찾을 수 없습니다.');
    }

    await this.userRepository.remove(user);

    return success('사용자가 성공적으로 삭제되었습니다.', user);
  }

  async findUserAndUniversityApplications(customUrl: string): Promise<Result<any>> {
    
    const user = await this.userRepository.findOne({ where: { customUrl } });
    
    if (!user) {
      return fail('사용자를 찾을 수 없습니다.');
    }
  
    const universityApplications = await this.universityApplicationService.findAll(user.userId);
  
    // 수시 및 정시 지원 여부 확인
    const EarlyDecisionMessages: string[] = [];
    const RegularDecisionMessages: string[] = [];
  
    // 수시 지원 여부 확인
    if (user.isEarlyDecision) {
      EarlyDecisionMessages.push("수시 지원이 공개되어있습니다.");
    } else {
      EarlyDecisionMessages.push("수시 지원이 공개되어있지 않습니다.");
    }
  
    // 정시 지원 여부 확인
    if (user.isRegularDecision) {
      RegularDecisionMessages.push("정시 지원이 공개되어있습니다.");
    } else {
      RegularDecisionMessages.push("정시 지원이 공개되어있지 않습니다.");
    }
  
    // 메시지 조합
    const EarlyDecision = EarlyDecisionMessages.join(' ');
    const RegularDecision = RegularDecisionMessages.join(' ');
  
    // 수시 및 정시 지원서 필터링
    const filteredApplications = universityApplications.map(application => {
      return {
        ...application,
        university: application.university.filter(u => {
          // 수시 지원 필터링
          if (user.isEarlyDecision && u.applicationType.isEarlyDecision) {
            return true;
          }
          // 정시 지원 필터링
          if (user.isRegularDecision && u.applicationType.isRegularDecision) {
            return true;
          }
          return false;
        })
      };
    }).filter(application => application.university.length > 0); // 필터링된 지원서가 존재하는지 확인
  
    return success('사용자와 대학 지원서를 성공적으로 조회했습니다.', {
      user,
      universityApplications: filteredApplications, // 필터링된 지원서 반환
      EarlyDecision,
      RegularDecision
    });
  }

  // 사용저 정의 URL 생성 및 중복확인
  async createCustomUrl(userId: string, customUrl: string): Promise<Result<User>> {
    // 사용자 찾기
    const existingUser = await this.userRepository.findOne({
      where: { customUrl },
    });
    if (existingUser) {
      return fail('이미 존재하는 커스텀 URL입니다.');
    }

    // 사용자 찾기
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (!user) {
      return fail('사용자를 찾을 수 없습니다.');
    }

    // 사용자 URL 생성
    user.customUrl = customUrl;
    await this.userRepository.save(user);

    return success('사용자 URL이 성공적으로 생성되었습니다.', user);
  }

  // 사용자 정의 URL로 사용자 찾기
  async CheckByCustomUrl(customUrl: string): Promise<Result<User>> {
    const check = await this.userRepository.findOne({
      where: { customUrl },
    });

    if (!check) {
      return success('사용 가능한 커스텀 URL입니다.', check);
    }

    return fail('이미 존재하는 커스텀 URL입니다.');
  } 

  // 사용자 리스트
  async findAll(): Promise<Result<User[]>> {
    const users = await this.userRepository.find();
    return success('사용자 리스트를 성공적으로 조회했습니다.', users);
  }
}
