import { Module } from '@nestjs/common';
import { MailesManagementService } from './mailes-management.service';
import { MailesManagementController } from './mailes-management.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/registration/registration.model';
import { ChangePasswordLinksManagementModule } from 'src/change-password-links-management/change-password-links-management.module';
import { changePasswordLinkSchema } from '../change-password-links-management/change-password-links-management.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'changePasswordLinks', schema: changePasswordLinkSchema },
    ]),
    ChangePasswordLinksManagementModule,
  ],
  controllers: [MailesManagementController],
  providers: [MailesManagementService],
})
export class MailesManagementModule {}
