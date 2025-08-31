import { Body, Controller, Get, Patch, Query, Res } from '@nestjs/common';
import { ChangePasswordLinksManagementService } from './change-password-links-management.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetChangePasswordLinkDto } from './dto/getChangePasswordLink.dto';
import { ChangePasswordLinkStateDto } from './dto/ChangePasswordLinkState.dto';

@Controller('change-password-links-management')
export class ChangePasswordLinksManagementController {
  constructor(
    private readonly changePasswordLinksService: ChangePasswordLinksManagementService,
  ) {}

  @Get('/getChangePasswordLinkState')
  async getChangePasswordLink(
    @Query() getChangePasswordLinkDto: GetChangePasswordLinkDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.changePasswordLinksService.getChangePasswordLinkState(
          getChangePasswordLinkDto,
        ),
      );
  }

  @Patch('/changePasswordLinkState')
  async changePasswordLinkState(
    @Body() changePasswordLinkStateDto: ChangePasswordLinkStateDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.changePasswordLinksService.changePasswordLinkState(
          changePasswordLinkStateDto,
        ),
      );
  }
}
