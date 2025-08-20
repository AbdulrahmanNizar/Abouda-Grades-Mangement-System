import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GradesManagementService } from './grades-management.service';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetGradesDto } from './dto/GetGradesTables.dto';
import { CreateGradesTableDto } from './dto/CreateGradesTable.dto';
import { UpdateUserGradesTableDto } from './dto/UpdateGradesTable.dto';
import { DeleteGradesTableDto } from './dto/DeleteGradesTable.dto';
import { AuthGuard } from '../registration/auth/auth.guard';
import { GetFilteredGradesDto } from './dto/GetFilteredGradesTables.dto';
import { GetGradesTableDetailsDto } from './dto/GetGradesTableDetails.dto';
import { GetGradesTablesYearsDto } from './dto/GetGradesTablesYears.dto';
import { GetGradesByYearDto } from './dto/GetGradesByYear.dto';
import { ValidateGradesTableDataDto } from './dto/ValidateGradesTableDate.dto';

@Controller('grades-management')
export class GradesManagementController {
  constructor(
    private readonly gradesManagementService: GradesManagementService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/getGradesTables/:userId')
  async getGradesTable(
    @Param() getGradesDto: GetGradesDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.gradesManagementService.getGradesTable(getGradesDto));
  }

  @UseGuards(AuthGuard)
  @Get('/getGradesTablesYears/:userId')
  async getGradesTablesYears(
    @Param() getGradesTablesYearsDto: GetGradesTablesYearsDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.getGradesTablesYears(
          getGradesTablesYearsDto,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Get('/getGradesTableDetails/:tableId')
  async getGradesTableDetails(
    @Param() getGradesTableDetailsDto: GetGradesTableDetailsDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.getGradesTableDetails(
          getGradesTableDetailsDto,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Post('/getGradesByYear')
  async getCurrentYearGrades(
    @Body() getGradesByYearDto: GetGradesByYearDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.getGradesByYear(getGradesByYearDto),
      );
  }

  @UseGuards(AuthGuard)
  @Post('/getFilteredGradesTables')
  async getFilteredGradesTables(
    @Body() getFilteredGradesDto: GetFilteredGradesDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.getFilteredGradesTables(
          getFilteredGradesDto,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Post('/validateGradesTableDate')
  async validateGradesTableDate(
    @Body() validateGradesTableDateDto: ValidateGradesTableDataDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.validateGradesTableDate(
          validateGradesTableDateDto,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Post('/createGradesTable')
  async createGradesTable(
    @Body() createGradesTableDto: CreateGradesTableDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(
        await this.gradesManagementService.createGradesTable(
          createGradesTableDto,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Patch('/updateGradesTable')
  async update_grades_table(
    @Body() updateGradesTableDto: UpdateUserGradesTableDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.updateGradesTable(
          updateGradesTableDto,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteGradesTable')
  async delete_grades_table(
    @Body() deleteGradesTableDto: DeleteGradesTableDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.deleteGradesTable(
          deleteGradesTableDto,
        ),
      );
  }
}
