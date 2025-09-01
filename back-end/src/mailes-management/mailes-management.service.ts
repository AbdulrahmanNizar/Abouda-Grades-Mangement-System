import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { CreateNewPasswordEmailDto } from './dto/CreateNewPasswordEmail.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/registration/registration.model';
import { changePasswordLinks } from '../change-password-links-management/change-password-links-management.model';
import * as crypto from 'crypto-js';

@Injectable()
export class MailesManagementService {
  constructor(
    @InjectModel('changePasswordLinks')
    private readonly changePasswordLinksModel: Model<changePasswordLinks>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private mailerService: MailerService,
  ) {}

  async sendCreateNewPasswordEmail(
    requestInfo: CreateNewPasswordEmailDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userInDB = await this.userModel.find({ email: requestInfo.email });

      if (userInDB.length > 0) {
        const encryptedUserIdJSON = JSON.stringify(userInDB[0]._id);
        const encryptedUserId = crypto.AES.encrypt(
          encryptedUserIdJSON,
          process.env.ENCRYPTION_SECRET_KEY,
        ).toString();
        const encodedEncryptedUserId = encodeURIComponent(encryptedUserId);

        const changePasswordLink = `http://localhost:5173/createNewPassword?userId=${encodedEncryptedUserId}`;

        const newChangePasswordLink = new this.changePasswordLinksModel({
          userId: encodedEncryptedUserId,
          link: changePasswordLink,
          valid: true,
        });
        await newChangePasswordLink.save();

        await this.mailerService.sendMail({
          to: userInDB[0].email,
          subject: 'Create New Password',
          template: './CreateNewPasswordEmailTemplate',
          context: {
            changePasswordLink: changePasswordLink,
          },
        });

        return {
          successMessage: 'Email was sent successfully',
          statusCode: 200,
        };
      } else {
        throw new HttpException('Email not found', 404);
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }
}
