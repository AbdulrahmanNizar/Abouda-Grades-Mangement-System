import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationModule } from './registration/registration.module';
import { GradesManagementModule } from './grades-management/grades-management.module';
import { UsersManagementModule } from './users-management/users-management.module';
import { SubjectsManagementModule } from './subjects-management/subjects-management.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
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
    forwardRef(() => RegistrationModule),
    GradesManagementModule,
    UsersManagementModule,
    SubjectsManagementModule,
  ],
})
export class AppModule {}
