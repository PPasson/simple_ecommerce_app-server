import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: "GET,PUT,PATCH,POST,DELETE",
  });

  await app.listen(parseInt(process.env.PORT));
  console.log(`service start on ${await app.getUrl()}`);
}
bootstrap();
