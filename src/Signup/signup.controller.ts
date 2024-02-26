import { Body, Controller, Headers, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { SigninDto } from './dto/siginin.dto';


@Controller('user')
export class SignupController {
  constructor(private readonly userService: SignupService) {}

  
  @Post('signup')
  @ApiCreatedResponse({description:'Signup user object as response', type: SignupDto})
  @ApiBadRequestResponse({description:' User cannot be signup'})
  async signUp(@Body() signUpInput: SignupDto): Promise<SignupDto> {
    return this.userService.signUp(signUpInput);
  }

  @Post('signin')
  @ApiCreatedResponse({description:'Signin user object as response', type: SigninDto})
  @ApiBadRequestResponse({description:' User cannot be signin'})
  async signIn(@Body() signInInput: SigninDto): Promise<{token:string}> {
    return this.userService.signIn(signInInput);
  }
  
  @Post('request-password-reset')
  @ApiCreatedResponse({description:'reset password token object as response', type: String })
  @ApiBadRequestResponse({description:' token is invalid'})
  async requestTokenPassword(@Body() body: { email: string }): Promise<{email:string, token: string}> {
   const result = await this.userService.resetTokenPassword(body.email);
    return result
  }

  @Post('reset-password')
  @ApiCreatedResponse({description:'reset password object as response', type: String})
  @ApiBadRequestResponse({description:' Password should be correct'})
  async resetPassword(
    @Headers('reset-token') resetToken: string,
    @Body() body: { newPassword: string; confirmPassword: string }, 
  ): Promise<{token:string}> {
    const { newPassword, confirmPassword } = body;
    const password = await this.userService.resetPassword(resetToken, newPassword, confirmPassword);
    return password
  }
}
