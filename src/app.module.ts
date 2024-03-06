import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './Signup/signup.module';
// import { userSchema } from './User/schema/register.schema';
require('dotenv').config();

@Module({
  imports: [  MongooseModule.forRoot('mongodb+srv://jerrygainju:Df3JNbCcJZ19MCYU@hvac-db.jnsyp6n.mongodb.net/?retryWrites=true&w=majority&appName=hvac-db',{dbName: 'hvac-calculation'}),
  SignupModule
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor() {
    console.log('connect to database', process.env.DATABASE);
    
  }
}
