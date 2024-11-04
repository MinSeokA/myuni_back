import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UniversityApplicationService } from './university-application.service';
import { CreateUniversityApplicationDto } from './dto/create-university-application.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateUniversityApplicationDto } from './dto/update-university-application.dto';

@ApiTags('university-application')
@Controller('university-application')
export class UniversityApplicationController {
  constructor(
    private readonly universityApplicationService: UniversityApplicationService,
  ) {}

  // 대학 지원서 생성
  @Post()
  @ApiProperty({ type: CreateUniversityApplicationDto, description: '대학 지원서 생성', example: CreateUniversityApplicationDto })
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateUniversityApplicationDto) {
    return this.universityApplicationService.create(body);
  }

  // 대학 지원서 삭제 (예: 대학 지원서 ID로 삭제)
  @Post(`delete/:id`)
  @ApiProperty({ type: String, description: '대학 지원서 삭제', example: 'id' })
  @UseGuards(JwtAuthGuard)
  async delete(@Body() body: { id: string }) {
    return this.universityApplicationService.remove(body.id);
  }

  // 대학 지원서 리스트
  @Get(':userId')
  @ApiProperty({ type: String, description: '대학 지원서 리스트', example: 'userId' })
  async findAll(
    @Param('userId') userId: string,
  ) {
    return this.universityApplicationService.findAll(userId);
  }

  // 대학 지원서 업데이트
  @Post('update')
  @ApiProperty({ type: UpdateUniversityApplicationDto, description: '대학 지원서 업데이트', example: UpdateUniversityApplicationDto })
  @UseGuards(JwtAuthGuard)
  async update(@Body() body: {
    applicantUserId: string,
    universityId: string,
    university: Partial<UpdateUniversityApplicationDto['university'][0]>, // 부분 업데이트를 위한 Partial 사용
  }) {
    return this.universityApplicationService.update(body.applicantUserId, body.universityId, body.university);
  }
}
