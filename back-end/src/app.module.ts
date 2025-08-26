import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from './registration/registration.module';
import { GradesManagementModule } from './grades-management/grades-management.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { SubjectsManagementModule } from './subjects-management/subjects-management.module';
import { MailesManagementModule } from './mailes-management/mailes-management.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import jwtConfig from './registration/config/jwt.config';
import googleConfig from './registration/config/google.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(googleConfig),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CacheModule.register({
      isGlobal: true,
      ttl: 5 * 1000,
      store: redisStore,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.MAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: 'No Reply',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter({
          inlineCssEnabled: true,
        }),
        options: {
          strict: true,
        },
      },
    }),
    forwardRef(() => RegistrationModule),
    GradesManagementModule,
    UsersManagementModule,
    SubjectsManagementModule,
    MailesManagementModule,
  ],
})
export class AppModule {}
