require('dotenv').config();
import * as config from '../config.js';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './validator/validator.pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (Number(config.service_cors) == 1) app.enableCors();

  if (Number(config.swagger) == 1) {
    const Swaggerconfig = new DocumentBuilder()
      .setTitle('Task Manager API')
      .setDescription('Task Manager API')
      .setVersion(require('../package.json').version)
      .addBearerAuth()
      .addServer(config.swagger_url)
      .build();

    const document = SwaggerModule.createDocument(app, Swaggerconfig);
    SwaggerModule.setup('/swagger', app, document);
    console.log('Swagger has been started');
  }

  await app.listen(config.service_port, () => {
    console.log(`Service has been started on port:`, config.service_port);
  });
}
bootstrap();
