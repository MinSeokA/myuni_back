export interface JwtPayload {
  email: string; // 유저의 이메일
  sub: string; // 유저의 ID 또는 고유 식별자
}
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        sub: string;
        id: string;
        userId: string;
      }; // You can replace `any` with your user type
    }
  }
}
