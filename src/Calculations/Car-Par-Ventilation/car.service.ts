import { Injectable, HttpException, HttpStatus, Headers } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './car.schema';
import { CarDto } from './dto/car-input.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async postCar(car:CarDto): Promise<CarDto>  {
    const carData = await this.carModel.create(car)
    return carData
  }

  async getCar(car:CarDto): Promise<CarDto>  {
    const project = await this.carModel.findOne({projectName:car.projectName})
    return project
  }
}
