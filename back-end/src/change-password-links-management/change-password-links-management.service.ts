import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { changePasswordLinks } from './change-password-links-management.model';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { GetChangePasswordLinkDto } from './dto/getChangePasswordLink.dto';
import { ChangePasswordLinkStateDto } from './dto/ChangePasswordLinkState.dto';

@Injectable()
export class ChangePasswordLinksManagementService {
  constructor(
    @InjectModel('changePasswordLinks')
    private readonly changePasswordLinksModel: Model<changePasswordLinks>,
  ) {}

  async getChangePasswordLinkState(
    requestInfo: GetChangePasswordLinkDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const linkInDB = await this.changePasswordLinksModel.find({
        userId: encodeURIComponent(requestInfo.userId),
      });

      if (linkInDB.length > 0) {
        return {
          successMessage: 'Got the link successfully',
          statusCode: 200,
          data: linkInDB[0],
        };
      } else {
        throw new HttpException('Link not found', 404);
      }
    } catch (err) {
      throw new HttpException('Link not found', 404);
    }
  }

  async changePasswordLinkState(
    requestInfo: ChangePasswordLinkStateDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const linkInDB = await this.changePasswordLinksModel.find({
        userId: requestInfo.userId,
      });

      if (linkInDB.length > 0) {
        await this.changePasswordLinksModel.updateOne(
          { userId: requestInfo.userId },
          { $set: { valid: false } },
        );

        return {
          successMessage: 'The link state was updated successfully',
          statusCode: 200,
        };
      } else {
        throw new HttpException('Link not found', 404);
      }
    } catch (err) {
      throw new HttpException('Link not found', 404);
    }
  }
}
