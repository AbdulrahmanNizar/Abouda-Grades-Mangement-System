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
import { AuthGuard } from './auth/auth.guard';
import { GetFilteredGradesDto } from './dto/GetFilteredGradesTables.dto';
import { GetGradesTableDetailsDto } from './dto/GetGradesTableDetails.dto';
import { GetGradesTablesYearsDto } from './dto/GetGradesTablesYears.dto';

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
  @Post('/getFilteredGradesTables')
  async getFilteredGradesTables(
    @Body() getFilteredGrades: GetFilteredGradesDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.getFilteredGradesTables(
          getFilteredGrades,
        ),
      );
  }

  @UseGuards(AuthGuard)
  @Post('/createGradesTable')
  async createGradesTable(
    @Body() createGradesTable: CreateGradesTableDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(201)
      .json(
        await this.gradesManagementService.createGradesTable(createGradesTable),
      );
  }

  @UseGuards(AuthGuard)
  @Patch('/updateGradesTable')
  async update_grades_table(
    @Body() updateGradesTable: UpdateUserGradesTableDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.updateGradesTable(updateGradesTable),
      );
  }

  @UseGuards(AuthGuard)
  @Delete('/deleteGradesTable')
  async delete_grades_table(
    @Body() deleteGradesTable: DeleteGradesTableDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(
        await this.gradesManagementService.deleteGradesTable(deleteGradesTable),
      );
  }
}
