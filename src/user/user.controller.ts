import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  update(@Body() user: CreateUserDto) {
    return this.userService.update(user);
  }

  @Get('profile/:userId')
  findOne(@Param("userId") userId: string) {
    return this.userService.findOne(userId);
  }

  @Delete('delete/:userId')
  delete(@Param("userId") userId: string) {
    return this.userService.remove(userId);
  }

  @Get('public/:userId')
  findOnePublic(@Param("userId") userId: string) {
    return this.userService.findUserAndUniversityApplications(userId);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }
}
