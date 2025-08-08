import { Body, Controller, Delete, Post, Res, UseGuards } from '@nestjs/common';
import { SubjectsManagementService } from './subjects-management.service';
import { AuthGuard } from './auth/auth.guard';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateSubjectDto } from './dto/CreateSubject.dto';
import { DeleteSubjectDto } from './dto/DeleteSubject.dto';

@Controller('subjects-management')
export class SubjectsManagementController {
  constructor(
    private readonly subjectsManagementService: SubjectsManagementService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/createSubject')
  async createSubject(
    @Body() createSubjectDto: CreateSubjectDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(
        await this.subjectsManagementService.createSubject(createSubjectDto),
      );
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteSubject')
  async deleteSubject(
    @Body() deleteSubjectDto: DeleteSubjectDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.subjectsManagementService.deleteSubject(deleteSubjectDto),
      );
  }
}
