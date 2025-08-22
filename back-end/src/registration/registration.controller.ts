import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { SignUpUserDto } from './dto/SignUp.dto';
import { SuccessResponseObjectDto } from 'src/dto/SuccessResponseObjectDto';
import { LoginUserDto } from './dto/Login.dto';
import { LogoutUserDto } from './dto/Logout.dto';
import { VerifyTokenDto } from './dto/VerifyToken.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/signup')
  async signup(
    @Body() createUserDto: SignUpUserDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(201).json(await this.registrationService.signup(createUserDto));
  }

  @Post('/login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.registrationService.login(loginUserDto));
  }

  @Get('/logout/:userId')
  async logout(
    @Param() logoutUserDto: LogoutUserDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res.status(200).json(await this.registrationService.logout(logoutUserDto));
  }

  @Post('/verifyToken')
  async verifyToken(
    @Body() verifyTokenDto: VerifyTokenDto,
    @Res() res,
  ): Promise<SuccessResponseObjectDto | void> {
    res
      .status(200)
      .json(await this.registrationService.verifyToken(verifyTokenDto));
  }

  @UseGuards(GoogleAuthGuard)
  @Get('/google/signup')
  googleSignup() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('/google/callback')
  googleCallback(@Req() req, @Res() res): SuccessResponseObjectDto | void {
    const googleToken = this.registrationService.initializeGoogleToken(
      req.user._id,
    );
    res.redirect(
      `http://localhost:5173/googleAuth/${googleToken}/${req.user._id}`,
    );
  }
}
