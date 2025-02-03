import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RABBITMQ_URL = process.env.RABBITMQ_URL;
  const SERVICE_NAME = process.env.SERVICE_NAME;

  const config = new DocumentBuilder()
    .setTitle(SERVICE_NAME)
    .setDescription('API Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'My API Docs',
    // Add a custom route for Swagger JSON
    customCss: '',
    customfavIcon: '',
    customJs: '',
  });

  // Optionally, explicitly serve Swagger JSON at a custom endpoint
  const server = app.getHttpAdapter().getInstance();
  server.get('/api-json', (req: any, res: any) => {
    res.json(document);
  });

  app.enableCors();
  await app.listen(3000);

  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: 'book_queue',
      queueOptions: { durable: false },
    },
  });

  await microservice.listen();
}
bootstrap();
