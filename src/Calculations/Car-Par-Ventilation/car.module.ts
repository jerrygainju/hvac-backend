import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './car.schema';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}

