import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';

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
  @ApiOperation({ summary: '사용자 업데이트' })
  @ApiProperty({ type: UpdateUserDto, description: '사용자 업데이트', example: UpdateUserDto })
  @UseGuards(JwtAuthGuard)
  update(@Body() user: UpdateUserDto) {
    return this.userService.update(user);
  }

  @Post('profile')
  @ApiOperation({ summary: '사용자 조회' })
  @ApiProperty({ type: String, description: '사용자 조회' })
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req: Request, @Res() res: Response) {
    return this.userService.findOne(req.user.userId);
  }

  @Delete('delete/:userId')
  @ApiOperation({ summary: '사용자 삭제' })
  @ApiParam({ name: 'userId', description: '사용자 삭제', example: 'userId' })
  @UseGuards(JwtAuthGuard)
  delete(@Param("userId") userId: string) {
    return this.userService.remove(userId);
  }

  @Get('public/:customUrl')
  @ApiOperation({ summary: '사용자 조회' })
  @ApiParam({ name: 'customUrl', description: '사용자 조회', example: 'customUrl' })
  findOnePublic(@Param("customUrl") customUrl: string) {
    return this.userService.findUserAndUniversityApplications(customUrl);
  }

  // 사용자 정의 URL 생성
  @Post('custom-url')
  @ApiOperation({ summary: '사용자 정의 URL 생성' })
  @ApiParam({ name: 'userId', description: '사용자 ID', example: 'userId' })
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
