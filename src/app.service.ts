import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return {
      message: "My University Application API",
      status: 401, // 401 Unauthorized
      data: null
    }
  }
}
