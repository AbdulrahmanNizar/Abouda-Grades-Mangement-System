import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UsersManagementService } from './users_management.service';
import { AuthGuard } from './auth/auth.guard';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetUserInfoDto } from './dto/GetUserInfo.dto';

@Controller('users-management')
export class UsersManagementController {
  constructor(
    private readonly usersManagementService: UsersManagementService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/getUserInfo')
  async getUserInfo(
    @Body() getUserInfoDto: GetUserInfoDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.usersManagementService.getUserInfo(getUserInfoDto));
  }
}
