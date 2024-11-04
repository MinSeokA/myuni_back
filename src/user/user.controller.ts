import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiProperty({ type: CreateUserDto, description: '사용자 생성', example: CreateUserDto })
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('update')
  @ApiProperty({ type: UpdateUserDto, description: '사용자 업데이트', example: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  update(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Get('profile/:userId')
  @ApiProperty({ type: String, description: '사용자 조회', example: 'userId' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param("userId") userId: string) {
    return this.userService.findOne(userId);
  }

  @Delete('delete/:userId')
  @ApiProperty({ type: String, description: '사용자 삭제', example: 'userId' })
  @UseGuards(JwtAuthGuard)
  delete(@Param("userId") userId: string) {
    return this.userService.remove(userId);
  }

  @Get('public/:customUrl')
  @ApiProperty({ type: String, description: '사용자 조회', example: 'customUrl' })
  findOnePublic(@Param("customUrl") customUrl: string) {
    return this.userService.findUserAndUniversityApplications(customUrl);
  }

  // 사용자 정의 URL 생성
  @Post('custom-url')
  @ApiProperty({ type: String, description: '사용자 정의 URL 생성', example: 'userId, customUrl' })
  @UseGuards(JwtAuthGuard)
  createCustomUrl(@Body() body: {
    userId: string;
    customUrl: string;
  }) {
    return this.userService.createCustomUrl(body.userId, body.customUrl);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }
}
