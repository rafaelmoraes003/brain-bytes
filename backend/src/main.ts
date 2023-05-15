import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

const PORT: number = Number(process.env.PORT) || 3001;

async function bootstrap(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
