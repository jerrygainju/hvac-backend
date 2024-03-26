import { Body, Controller, Headers, Post, Get } from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './dto/car-input.dto';


@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('postCar')
  async postCar(@Body() car:CarDto): Promise<CarDto> {
    return this.carService.postCar(car);
  }

  @Get('getCar')
  async getCar(@Body() car:CarDto): Promise<CarDto> {
    return this.carService.getCar(car);
  }
  }

  

