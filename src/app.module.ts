import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
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
    ServeStaticModule.forRoot({
    rootPath: join(__dirname, '.', 'swagger'), // swagger 파일 경로
      serveRoot: '/api/', // 접속 시 사용할 경로
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '61.78.89.183',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'myuni',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
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
