import { HttpException, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { User } from 'src/registration/registration.model';
import { GetUserInfoDto } from './dto/GetUserInfo.dto';
import { ChangeUserAccountPictureDto } from './dto/ChangeUserAccountPicture.dto';
import { Cache } from 'cache-manager';
import { ChangeUserPasswordDto } from './dto/ChangeUserPassword.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto-js';

@Injectable()
export class UsersManagementService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async getUserInfo(
    requestInfo: GetUserInfoDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userCachedData = await this.cacheManager.get(
        `User(${requestInfo.userId})Info`,
      );
      if (userCachedData) {
        return {
          successMessage: 'Got the user info successfully',
          statusCode: 200,
          data: userCachedData,
        };
      } else {
        const user = await this.userModel.find({ _id: requestInfo.userId });
        if (user.length > 0) {
          const userData = {
            username: user[0].username,
            email: user[0].email,
            userSubjects: user[0].userSubjects,
            userAccountPicture: user[0].userAccountPicture,
          };

          await this.cacheManager.set(
            `User(${requestInfo.userId})Info`,
            userData,
          );

          return {
            successMessage: 'Got the user info successfully',
            statusCode: 200,
            data: userData,
          };
        } else {
          throw new HttpException('User not found', 404);
        }
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async changeAccountPicture(
    requestInfo: ChangeUserAccountPictureDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      await this.userModel.updateOne(
        { _id: requestInfo.userId },
        { $set: { userAccountPicture: requestInfo.fileBase64 } },
      );

      return {
        successMessage: 'Account picture changed successfully',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async changePassword(
    requestInfo: ChangeUserPasswordDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const decodedDecryptedUserId = decodeURIComponent(requestInfo.userId);

      const encryptedUserIdBytes = crypto.AES.decrypt(
        decodedDecryptedUserId,
        process.env.ENCRYPTION_SECRET_KEY,
      );
      const decryptedUserId = encryptedUserIdBytes.toString(crypto.enc.Utf8);
      JSON.parse(decryptedUserId);

      const decryptedUserIdWithoutQuotes = decryptedUserId
        .split('')
        .filter((char) => char != '"')
        .join('');

      const userInDB = await this.userModel.find({
        _id: decryptedUserIdWithoutQuotes,
      });
      if (userInDB.length > 0) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(requestInfo.newPassword, salt);
        await this.userModel.updateOne(
          { _id: userInDB[0]._id },
          { $set: { password: hashedPassword } },
        );

        return {
          successMessage: 'Password was changed successfully',
          statusCode: 200,
        };
      } else {
        throw new HttpException('User not found', 404);
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}
