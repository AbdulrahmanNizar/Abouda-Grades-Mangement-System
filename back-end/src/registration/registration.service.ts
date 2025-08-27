import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './registration.model';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { SignUpUserDto } from './dto/SignUp.dto';
import { LoginUserDto } from './dto/Login.dto';
import { LogoutUserDto } from './dto/Logout.dto';
import { VerifyTokenDto } from './dto/VerifyToken.dto';
import { GoogleLoginDto } from './dto/GoogleLogin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(
    requestInfo: SignUpUserDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const usernameExistence = await this.userModel.find({
        username: requestInfo.username,
      });

      if (usernameExistence.length > 0) {
        throw new HttpException('Username already exists', 400);
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(requestInfo.password, salt);

        const newUser = new this.userModel({
          username: requestInfo.username,
          email: requestInfo.email,
          password: hashedPassword,
          logged: true,
          userSubjects: [
            'English',
            'Math',
            'Chemistry',
            'Physics',
            'Biology',
            'History',
            'Geography',
            'Social Studies',
            'Computer Studies',
          ],
          userAccountPicture: '',
        });
        await newUser.save();

        const jwtToken = this.jwtService.sign({ id: newUser._id });

        return {
          successMessage: 'Signed up successfully',
          statusCode: 201,
          data: { jwtToken: jwtToken, userId: newUser._id },
        };
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async login(
    requestInfo: LoginUserDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      const userInDB = await this.userModel.find({
        username: requestInfo.username,
      });

      if (userInDB.length > 0) {
        const passwordComparison = await bcrypt.compare(
          requestInfo.password,
          userInDB[0].password,
        );

        if (passwordComparison) {
          await this.userModel.updateOne(
            { username: requestInfo.username },
            { $set: { logged: true } },
          );

          const jwtToken = this.jwtService.sign({ id: userInDB[0]._id });

          return {
            successMessage: 'Logged in successfully',
            statusCode: 200,
            data: { jwtToken: jwtToken, userId: userInDB[0]._id },
          };
        } else {
          throw new HttpException('Wrong username or password', 400);
        }
      } else {
        throw new HttpException('Wrong username or password', 400);
      }
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async logout(
    requestInfo: LogoutUserDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      await this.userModel.updateOne(
        { _id: requestInfo.userId },
        { $set: { logged: false } },
      );

      return {
        successMessage: 'Logged out successfully',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async verifyToken(
    requestInfo: VerifyTokenDto,
  ): Promise<SuccessResponseObjectDto | void> {
    try {
      this.jwtService.verify(requestInfo.jwtToken, {
        secret: process.env.JWT_SECRET,
      });

      return {
        successMessage: 'Token verifyed',
        statusCode: 200,
      };
    } catch (err) {
      throw new HttpException(err, err.status);
    }
  }

  async validateGoogleUser(googleUser: GoogleLoginDto) {
    const userInDB = await this.userModel.find({ email: googleUser.email });

    if (userInDB.length > 0) {
      await this.userModel.updateOne(
        { _id: userInDB[0]._id },
        { $set: { logged: true } },
      );
      return userInDB[0];
    } else {
      const newUser = new this.userModel({
        username: googleUser.firstName,
        email: googleUser.email,
        password: googleUser.password,
        userAccountPicture: googleUser.avatarUrl,
        logged: true,
        userSubjects: [
          'English',
          'Math',
          'Chemistry',
          'Physics',
          'Biology',
          'History',
          'Geography',
          'Social Studies',
          'Computer Studies',
        ],
      });
      await newUser.save();
      return newUser;
    }
  }

  initializeGoogleToken({ userId }): string | void {
    const jwtToken = this.jwtService.sign({ id: userId });
    return jwtToken;
  }
}
