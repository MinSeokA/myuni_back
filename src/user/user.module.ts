import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { UniversityApplicationService } from 'src/university-application/university-application.service';
import { UniversityApplicationModule } from 'src/university-application/university-application.module';

@Module({
  imports: [
    ConfigModule, // Add ConfigModule to imports
    TypeOrmModule.forFeature([User]),
    UniversityApplicationModule
  ],
  controllers: [UserController],
  providers: [UserService], // No need to provide ConfigService here
  exports: [UserService], // Export UserService if it's needed in other modules
})
export class UserModule {}
