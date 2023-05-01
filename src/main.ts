import { NestFactory } from '@nestjs/core';
import  AppModule  from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './http-interceptor';
import { HttpExceptionFilter } from './http-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple E-Commerce App')
    .setDescription('Simple E-Commerce App: APIs Document')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: "GET,PUT,PATCH,POST,DELETE",
  });

  await app.listen(3000);
  console.log(`service start on ${await app.getUrl()}`);
}
bootstrap();
