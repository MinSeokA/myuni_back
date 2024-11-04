import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UniversityService } from './university.service';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('university')
@Controller('university')
export class UniversityController {
  constructor(
    private readonly universityService: UniversityService,
  ) {}

  // 대학 생성
  @Post()   
  @ApiOperation({ summary: '대학 생성' })
  @ApiProperty({ type: CreateUniversityDto, description: '대학 생성', example: CreateUniversityDto })
  async create(@Body() body: CreateUniversityDto) {
    return this.universityService.create(body);
  }

  // 대학 리스트
  @Get('list')
  @ApiOperation({ summary: '대학 리스트' })
  @ApiProperty({ type: String, description: '대학 리스트' })
  async findAll() {
    return this.universityService.findAll();
  }

  // 대학 삭제
  @Delete('delete')
  @ApiOperation({ summary: '대학 삭제' })
  @ApiProperty({ type: String, description: '대학 삭제', example: 'name' })
  async delete(@Body() body: { name: string }) {
    return this.universityService.delete(body.name);
  }

  // 대학 업데이트
  @Post('update')
  @ApiOperation({ summary: '대학 업데이트' })
  @ApiProperty({ type: UpdateUniversityDto, description: '대학 업데이트', example: UpdateUniversityDto })
  async update(@Body() body: UpdateUniversityDto) {
    return this.universityService.update(body);
  }

}
