import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Result, success } from 'src/utils/result';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Generates a JWT token for a user
  async generateJwtToken(userId: any, email: any): Promise<any> {
    const payload = { sub: userId, email: email };
    
    return this.jwtService.sign(payload);
  }

  // Finds or creates a user from Google profile information
  async validateUser(profile: any): Promise<Result<any>> {
    // 이미 있는경우
    const existingUser = await this.userService.findByEmail(profile.email);
    if (existingUser) {
      return success('사용자를 찾았습니다.', existingUser);
    }

    // 새로운 사용자 생성
    const userId = profile.email.split('@')[0] + Math.floor(Math.random() * 1000);
    const createUserData = {
      userId: userId,
      email: profile.email,
      name: profile.name,
      photo: profile.profilePhoto,
      isEarlyDecision: false,
      isRegularDecision: false,
      isAdmissionResult: false
    }

    const newUser = await this.userService.create(createUserData);

    return success('사용자가 성공적으로 생성되었습니다.', newUser);
  }

  
}
