import { Module } from '@nestjs/common';
import { ChangePasswordLinksManagementController } from './change-password-links-management.controller';
import { ChangePasswordLinksManagementService } from './change-password-links-management.service';
import { MongooseModule } from '@nestjs/mongoose';
import { changePasswordLinkSchema } from './change-password-links-management.model';
import { userSchema } from 'src/registration/registration.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'changePasswordLinks', schema: changePasswordLinkSchema },
    ]),
  ],
  controllers: [ChangePasswordLinksManagementController],
  providers: [ChangePasswordLinksManagementService],
  exports: [ChangePasswordLinksManagementService],
})
export class ChangePasswordLinksManagementModule {}
