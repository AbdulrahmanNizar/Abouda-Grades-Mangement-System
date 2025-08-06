import { HttpException, Injectable } from '@nestjs/common';
import { GetGradesDto } from './dto/GetGrades.dto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { gradesTables } from './grades-management.model';
import { CreateGradesTableDto } from './dto/CreateGradesTable.dto';
import { UpdateUserGradesTableDto } from './dto/UpdateGradesTable.dto';
import { DeleteGradesTableDto } from './dto/DeleteGradesTable.dto';
import { GetFilteredGradesDto } from './dto/GetFilteredGrades.dto';
import { GetGradesTableDetailsDto } from './dto/GetGradesTableDetails.dto';
import { User } from 'src/registration/registration.model';

@Injectable()
export class GradesManagementService {
  constructor(
    @InjectModel('gradesTables')
    private readonly gradesTablesModel: Model<gradesTables>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getGradesTable(
    requestInfo: GetGradesDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userGradesTables = await this.gradesTablesModel.find({
        userId: requestInfo.userId,
      });

      return {
        successMessage: 'Got user grades successfully',
        statusCode: 200,
        data: { userGradesTables: userGradesTables },
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async getGradesTableDetails(
    requestInfo: GetGradesTableDetailsDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const gradesTableDetails = await this.gradesTablesModel.find({
        _id: requestInfo.tableId,
      });

      return {
        successMessage: 'Got the grades table details successfully',
        statusCode: 200,
        data: gradesTableDetails,
      };
    } catch (err) {
      throw new HttpException('Table not found', 404);
    }
  }

  async getFilteredGradesTables(
    requestInfo: GetFilteredGradesDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      if (
        requestInfo.yearFiltration != undefined &&
        requestInfo.trimesterFiltration != undefined
      ) {
        const userFilteredGradesTables = await this.gradesTablesModel.find({
          userId: requestInfo.userId,
          userGradesYear: requestInfo.yearFiltration,
          userGradesTrim: requestInfo.trimesterFiltration,
        });

        return {
          successMessage: 'Got the filtered grades tables successfully',
          statusCode: 200,
          data: userFilteredGradesTables,
        };
      } else if (requestInfo.yearFiltration != undefined) {
        const userFilteredGradesTables = await this.gradesTablesModel.find({
          userId: requestInfo.userId,
          userGradesYear: requestInfo.yearFiltration,
        });

        return {
          successMessage: 'Got the filtered grades tables successfully',
          statusCode: 200,
          data: userFilteredGradesTables,
        };
      } else if (requestInfo.trimesterFiltration != undefined) {
        const userFilteredGradesTables = await this.gradesTablesModel.find({
          userId: requestInfo.userId,
          userGradesTrim: requestInfo.trimesterFiltration,
        });

        return {
          successMessage: 'Got the filtered grades tables successfully',
          statusCode: 200,
          data: userFilteredGradesTables,
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async createGradesTable(
    requestInfo: CreateGradesTableDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const checkingTheExistenseOfTheTable = await this.gradesTablesModel.find({
        userGradesYear: requestInfo.userGradesYear,
        userGradesTrim: requestInfo.userGradesTrim,
      });

      if (checkingTheExistenseOfTheTable.length > 0) {
        throw new HttpException('The grades table is already exist', 400);
      } else {
        const userInDB = await this.userModel.find({ _id: requestInfo.userId });

        let userFullGrade: number = 0;

        for (let i = 0; i < requestInfo.userGrades.length; i++) {
          userFullGrade += requestInfo.userGrades[i];
        }

        const userGradesAverage: number =
          userFullGrade / requestInfo.userGrades.length;

        const newGradesTable = new this.gradesTablesModel({
          userId: requestInfo.userId,
          userSubjects: userInDB[0].userSubjects,
          userGradesYear: requestInfo.userGradesYear,
          userGradesTrim: requestInfo.userGradesTrim,
          userGradesTable: requestInfo.userGrades,
          userGradesAverage: userGradesAverage,
        });
        await newGradesTable.save();

        return {
          successMessage: 'Grades table created successfully',
          statusCode: 201,
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async updateGradesTable(
    requestInfo: UpdateUserGradesTableDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const grades_table = await this.gradesTablesModel.find({
        _id: requestInfo.tableId,
      });

      if (grades_table[0].userId == requestInfo.userId) {
        const checkingTheExistenseOfTheTable =
          await this.gradesTablesModel.find({
            userGradesYear: requestInfo.newUserGradesTableYear,
            userGradesTrim: requestInfo.newUserGradesTableTrim,
          });

        if (checkingTheExistenseOfTheTable.length > 0) {
          throw new HttpException('This table is already exist', 400);
        } else {
          let userFullGrade: number = 0;

          for (let i = 0; i < requestInfo.newUserGradesTable.length; i++) {
            userFullGrade += requestInfo.newUserGradesTable[i];
          }

          const userGradesAverage: number =
            userFullGrade / requestInfo.newUserGradesTable.length;

          await this.gradesTablesModel.updateOne(
            { _id: requestInfo.tableId },
            {
              $set: {
                userGradesYear: requestInfo.newUserGradesTableYear,
                userGradesTrim: requestInfo.newUserGradesTableTrim,
                userGradesTable: requestInfo.newUserGradesTable,
                userGradesAverage: userGradesAverage,
              },
            },
          );

          return {
            successMessage: 'Table was updated successfully',
            statusCode: 200,
          };
        }
      } else {
        throw new HttpException(
          "You don't have the permissions to do this action",
          403,
        );
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async deleteGradesTable(
    requestInfo: DeleteGradesTableDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const gradesTable = await this.gradesTablesModel.find({
        _id: requestInfo.tableId,
      });

      if (gradesTable[0].userId == requestInfo.userId) {
        await this.gradesTablesModel.deleteOne({ _id: requestInfo.tableId });
        return {
          successMessage: 'Grades table deleted successfully',
          statusCode: 200,
        };
      } else {
        throw new HttpException(
          "You don't have the permissions to do this action",
          403,
        );
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}
