import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from  'cors'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  require('dotenv').config();
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('HVAC Calculation')
    .setDescription('HVAC calcuation')
    .setVersion('1.0')
    .addTag('HVAC')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
  console.log(`listening to port ${process.env.PORT}`);
  
}
bootstrap();
