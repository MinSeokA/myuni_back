import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { UniversityModule } from './university/university.module';
import { UniversityApplicationModule } from './university-application/university-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '61.78.89.183', // 데이터베이스 호스트
      port: 5432, // 데이터베이스 포트
      username: 'postgres', // 데이터베이스 사용자 이름
      password: 'root', // 데이터베이스 비밀번호
      database: 'myuni', // 데이터베이스 이름
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발 중에는 true로 설정 (생산에서는 false로 설정)
  }),
    AuthModule,
    UserModule,
    UniversityModule,
    UniversityApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
