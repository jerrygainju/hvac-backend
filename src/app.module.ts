import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './Signup/signup.module';
// import { userSchema } from './User/schema/register.schema';
require('dotenv').config();

@Module({
  imports: [  MongooseModule.forRoot(process.env.Database,{dbName: 'hvac-calculation'}),
  SignupModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
