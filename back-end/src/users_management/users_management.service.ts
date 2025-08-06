import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { User } from 'src/registration/registration.model';
import { GetUserInfoDto } from './dto/GetUserInfo.dto';

@Injectable()
export class UsersManagementService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserInfo(
    requestInfo: GetUserInfoDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const user = await this.userModel.find({ _id: requestInfo.userId });

      return {
        successMessage: 'Got the user info successfully',
        statusCode: 200,
        data: {
          userId: user[0]._id,
          username: user[0].username,
          email: user[0].email,
          userSubjects: user[0].userSubjects,
        },
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}
