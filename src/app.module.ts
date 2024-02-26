import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './Signup/signup.module';
// import { userSchema } from './User/schema/register.schema';

@Module({
  imports: [  MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'hvac-calculation'}),
  SignupModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
