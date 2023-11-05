import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port: string | number = process.env.NESTPORT || 3000;
  const app = await NestFactory.create(AppModule);
  // enable CORS
  app.enableCors();
  // define a global prefix for all our routes: '/http://localhost:3000/api/...'
  app.setGlobalPrefix('api');
  // Auto-validation
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
