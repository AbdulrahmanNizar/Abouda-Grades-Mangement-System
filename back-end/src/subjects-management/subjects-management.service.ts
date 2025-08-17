import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/registration/registration.model';
import { CreateSubjectDto } from './dto/CreateSubject.dto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { DeleteSubjectDto } from './dto/DeleteSubject.dto';
import { GetSubjectsDto } from './dto/GetSubjects.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class SubjectsManagementService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @InjectModel('User') private readonly userModel: Model<User>,
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
        const userInDB = await this.userModel.find({ _id: requestInfo.userId });
        const userSubjects = userInDB[0].userSubjects;

        await this.cacheManager.set(
          `User${requestInfo.userId}Subjects`,
          userSubjects,
        );

        return {
          successMessage: 'Got the user subjects successfully',
          statusCode: 200,
          data: userSubjects,
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
      const userInDB = await this.userModel.find({ _id: requestInfo.userId });
      const newUserSubjectsList = userInDB[0].userSubjects;

      if (newUserSubjectsList.includes(requestInfo.newSubject)) {
        throw new HttpException('The subject is already exist', 400);
      } else {
        newUserSubjectsList.push(requestInfo.newSubject);

        await this.userModel.updateOne(
          { _id: requestInfo.userId },
          { $set: { userSubjects: newUserSubjectsList } },
        );

        return {
          successMessage: 'Subject created successfully',
          statusCode: 201,
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
      const userInDB = await this.userModel.find({ _id: requestInfo.userId });
      let userSubjectsList = userInDB[0].userSubjects;

      if (userSubjectsList.includes(requestInfo.subject)) {
        userSubjectsList = userSubjectsList.filter(
          (subject) => subject != requestInfo.subject,
        );

        await this.userModel.updateOne(
          { _id: requestInfo.userId },
          { $set: { userSubjects: userSubjectsList } },
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
