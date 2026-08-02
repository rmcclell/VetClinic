/**
 * VetClinic API Server
 *
 * In production (Docker), this also serves the Angular frontend as static files.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync } from 'fs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Vet Clinic API')
    .setDescription('The mobile vet clinic API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // In production, serve the Angular frontend as static files
  const publicPath = join(__dirname, 'public');
  if (existsSync(publicPath)) {
    app.useStaticAssets(publicPath);
    Logger.log(`📁 Serving static frontend from: ${publicPath}`);

    // SPA fallback — serve index.html for any non-API, non-file route
    const express = app.getHttpAdapter().getInstance();
    const indexPath = join(publicPath, 'index.html');
    express.get('*', (req: any, res: any, next: any) => {
      // Skip API routes, Swagger, and requests with file extensions
      if (
        req.path.startsWith(`/${globalPrefix}`) ||
        req.path.startsWith('/api-docs') ||
        req.path.match(/\.\w+$/)
      ) {
        return next();
      }
      res.sendFile(indexPath);
    });
  }

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  Logger.log(
    `📚 Swagger UI available at: http://localhost:${port}/api-docs`,
  );
  if (existsSync(publicPath)) {
    Logger.log(
      `🌐 Frontend available at: http://localhost:${port}`,
    );
  }
}

bootstrap();
