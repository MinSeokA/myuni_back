import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      message: "My University Application API",
      status: 401, // 401 Unauthorized
      data: null
    }
  }
}
