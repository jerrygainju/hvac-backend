import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './Signup/signup.module';
import { CarModule } from './Calculations/Car-Par-Ventilation/car.module';
// import { userSchema } from './User/schema/register.schema';
require('dotenv').config();

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'hvac-calculation'}),
  SignupModule,
  CarModule
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor() {
    console.log('connect to database', process.env.DATABASE);
  }
}
