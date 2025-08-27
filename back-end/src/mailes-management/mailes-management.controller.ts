import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailesManagementService } from './mailes-management.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateNewPasswordEmailDto } from './dto/CreateNewPasswordEmail.dto';

@Controller('mailes-management')
export class MailesManagementController {
  constructor(
    private readonly mailesManagementService: MailesManagementService,
  ) {}

  @Post('/sendCreateNewPasswordEmail')
  async sendCreateNewPasswordEmail(
    @Body() createNewPasswordEmailDto: CreateNewPasswordEmailDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.mailesManagementService.sendCreateNewPasswordEmail(
          createNewPasswordEmailDto,
        ),
      );
  }
}
