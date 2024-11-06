import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google:dev')
  @UseGuards(AuthGuard('Devgoogle'))
  async googleDevAuth() {}

  @Get('google/callback:dev')
  @UseGuards(AuthGuard('Devgoogle'))
  async googleDevAuthRedirect(@Req() req: Request, @Res() res: Response, @Query("service") service: string) {
    const token = await this.authService.generateJwtToken(req.user.userId, req.user.email);

    return res.redirect(`http://localhost:5173/auth-callback?token=${token}&status=success&source=google&email=${req.user.email}`);
  }


  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response, @Query("service") service: string) {
    const token = await this.authService.generateJwtToken(req.user.userId, req.user.email);

    return res.redirect(`https://uni.lunaiz.com/auth-callback?token=${token}&status=success&source=google&email=${req.user.email}`);
  }
}
