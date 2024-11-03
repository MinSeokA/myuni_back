import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';

@Controller('university')
export class UniversityController {
  constructor(
    private readonly universityService: UniversityService,
  ) {}

  // 대학 생성
  @Post()
  async create(@Body() body: CreateUniversityDto) {
    return this.universityService.create(body);
  }

  // 대학 리스트
  @Get('list')
  async findAll() {
    return this.universityService.findAll();
  }

  // 대학 삭제
  @Delete('delete')
  async delete(@Body() body: { name: string }) {
    return this.universityService.delete(body.name);
  }

  // 대학 업데이트
  @Post('update')
  async update(@Body() body: UpdateUniversityDto) {
    return this.universityService.update(body);
  }

}
