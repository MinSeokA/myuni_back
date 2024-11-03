import { Module } from '@nestjs/common';
import { UniversityApplicationController } from './university-application.controller';
import { UniversityApplicationService } from './university-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityApplication } from './entity/university-application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UniversityApplication]),
  ],
  controllers: [UniversityApplicationController],
  providers: [UniversityApplicationService],
  exports: [UniversityApplicationService],
})
export class UniversityApplicationModule {}
