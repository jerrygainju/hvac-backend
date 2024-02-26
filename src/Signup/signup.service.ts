import { Injectable, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Signup } from './signup.schema';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/siginin.dto';
import { validateEmail, validatePassword, validatePasswordMatch, validateSignInInput } from 'src/Validations/signup-validation.helper';
import * as jwt from 'jsonwebtoken';
import ErrorMessage from 'src/Common/errors-message';

@Injectable()
export class SignupService {
  constructor(@InjectModel(Signup.name) private userModel: Model<Signup>) {}

  async signUp(signUpInput: SignupDto): Promise<SignupDto> {
    try {
      const { username, email, password, confirmPassword } = signUpInput;

      if (!(username && email && password)) {
        throw new HttpException(ErrorMessage.FILL_ALL_DATA, HttpStatus.BAD_REQUEST);
      }

      if (password !== confirmPassword) {
        throw new HttpException(ErrorMessage.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
      }

      if (!validateEmail(email)) {
        throw new HttpException(ErrorMessage.INVALID_EMAIL, HttpStatus.BAD_REQUEST);
      }

      const existingEmail = await this.userModel.findOne({ email: { $regex: new RegExp(`^${email}$`), $options: 'i' } });
      if (existingEmail) {
        throw new HttpException(ErrorMessage.EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
      }

      if (!validatePassword(password)) {
        throw new HttpException(ErrorMessage.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
      }
      
      const encryptPassword = await bcrypt.hash(password, 10);
      const user = {
        username: username,
        email: email.toLowerCase(),
        password: encryptPassword,
      };
      
      const newUser = await this.userModel.create(user);
      const sanitizedUser = {
        _id: newUser._id,
        ...user,
        confirmPassword
      };
      return sanitizedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);

      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signIn(signInInput: SigninDto): Promise<{token: string}> {
    try {
      const { email, password } = signInInput;
      validateSignInInput(email, password);
      const user = await this.userModel.findOne({ email: { $regex: new RegExp(`^${email}$`), $options: 'i' }}).exec();
      if (!user) {
        throw new HttpException(
           ErrorMessage.EMAIL_NOT_FOUND ,
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new HttpException(
          ErrorMessage.PASSWORD_INCORRECT,
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const token = jwt.sign({ userId: user._id, email, password }, process.env.SECRECT_KEY);
      const existedUser = {
        _id: user._id,
        email,
        password,
        token
      }
      
      return existedUser;
      
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error(error);

      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async resetTokenPassword(email: string): Promise<{email: string, token:string}> {
    try {
      if(!email){
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: ErrorMessage.FILL_ALL_DATA },
          HttpStatus.BAD_REQUEST,
        );
      }
      const user = await this.userModel.findOne({ email: { $regex: new RegExp(`^${email}$`), $options: 'i' }}).exec()
      if (!user) {
        throw new HttpException(
          { statusCode: HttpStatus.BAD_REQUEST, message: ErrorMessage.EMAIL_NOT_FOUND },
          HttpStatus.BAD_REQUEST,
        );
      }
      
      const resetToken = jwt.sign({ userId: user._id }, process.env.SECRECT_KEY, { expiresIn: '1h' });
      
      user.resetToken = resetToken;
      await user.save();
    
      return {email, token: resetToken };
    } catch (error) {
      console.error('Error in resetTokenPassword:', error);
    
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error', error },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
  }


async resetPassword(@Headers('reset-token') resetToken: string, newPassword: string, confirmPassword: string): Promise<{token:string}> {
  try {
    if (!resetToken) {
      throw new HttpException(
       ErrorMessage.INVALID_RESET_TOKEN,
        HttpStatus.BAD_REQUEST,
      );
    }
    if(newPassword !== confirmPassword)
    {
      throw new HttpException(ErrorMessage.PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
    }
    
    if (!validatePassword(newPassword)) {
      throw new HttpException(ErrorMessage.INVALID_PASSWORD, HttpStatus.BAD_REQUEST);
    }
    const decodedToken: any = jwt.verify(resetToken, process.env.SECRECT_KEY);

    const user = await this.userModel.findById(decodedToken.userId).exec();
    if (!user) {
      throw new HttpException(ErrorMessage.INVALID_RESET_TOKEN, HttpStatus.BAD_REQUEST);
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    await user.save();
    const showUser = {
      newPassword:user.password,
      token:user.resetToken
    }
    return showUser
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException(
        { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

}
