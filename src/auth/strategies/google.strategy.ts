import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { displayName, emails } = profile;

    try {
      // 유저 정보를 반환합니다.
      const profilex = {
        name: displayName,
        email: emails[0].value,
        profilePhoto: profile.photos[0].value,
      }
      const result = await this.authService.validateUser(profilex);

      return result.data;
    } catch (error) {
      console.error(
        error.response?.data || error.message,
      );
      throw error; // 에러 발생 시 NestJS가 에러를 처리하도록 던집니다.
    }
  }
}
