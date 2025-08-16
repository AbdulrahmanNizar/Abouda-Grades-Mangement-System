import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UsersManagementService } from './users-management.service';
import { AuthGuard } from '../registration/auth/auth.guard';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetUserInfoDto } from './dto/GetUserInfo.dto';
import { ChangeUserAccountPictureDto } from './dto/ChangeUserAccountPicture.dto';

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

  @UseGuards(AuthGuard)
  @Post('/changeAccountPicture')
  async changeAccountPicture(
    @Body() changeUserAccountPictureDto: ChangeUserAccountPictureDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.usersManagementService.changeAccountPicture(
          changeUserAccountPictureDto,
        ),
      );
  }
}
