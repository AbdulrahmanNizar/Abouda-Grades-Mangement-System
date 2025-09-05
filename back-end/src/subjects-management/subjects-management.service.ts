import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dto/CreateSubject.dto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { DeleteSubjectDto } from './dto/DeleteSubject.dto';
import { GetSubjectsDto } from './dto/GetSubjects.dto';
import { Cache } from 'cache-manager';
import { Subjects } from './subjects-management.model';

@Injectable()
export class SubjectsManagementService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @InjectModel('Subjects') private readonly subjectsModel: Model<Subjects>,
  ) {}

  async getSubjects(
    requestInfo: GetSubjectsDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userCachedSubjects = await this.cacheManager.get(
        `User(${requestInfo.userId})Subjects`,
      );
      if (userCachedSubjects) {
        return {
          successMessage: 'Got the user subjects successfully',
          statusCode: 200,
          data: userCachedSubjects,
        };
      } else {
        const userSubjects = await this.subjectsModel.find({
          userId: requestInfo.userId,
        });

        await this.cacheManager.set(
          `User${requestInfo.userId}Subjects`,
          userSubjects[0].subjects,
        );

        return {
          successMessage: 'Got the user subjects successfully',
          statusCode: 200,
          data: userSubjects[0].subjects,
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async createSubject(
    requestInfo: CreateSubjectDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userSubjects = await this.subjectsModel.find({
        userId: requestInfo.userId,
      });

      if (userSubjects[0].subjects.includes(requestInfo.newSubject)) {
        throw new HttpException('Subject is already exist', 400);
      } else {
        const newUserSubjects = userSubjects[0].subjects;
        newUserSubjects.push(requestInfo.newSubject);

        await this.subjectsModel.updateOne(
          { userId: requestInfo.userId },
          { $set: { subjects: newUserSubjects } },
        );
        return {
          successMessage: 'Subject created successfully',
          statusCode: 200,
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async deleteSubject(
    requestInfo: DeleteSubjectDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userSubjects = await this.subjectsModel.find({
        userId: requestInfo.userId,
      });
      let userSubjectsList = userSubjects[0].subjects;

      if (userSubjectsList.includes(requestInfo.subject)) {
        userSubjectsList = userSubjectsList.filter(
          (subject) => subject != requestInfo.subject,
        );

        await this.subjectsModel.updateOne(
          { userId: requestInfo.userId },
          { $set: { subjects: userSubjectsList } },
        );
        return {
          successMessage: 'Subject deleted successfully',
          statusCode: 200,
        };
      } else {
        throw new HttpException('Subject not found', 404);
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}
