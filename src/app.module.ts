import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { OrderModule } from "./order/order.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from 'path';
import { LoggerMiddleware } from './logger.middleware';


@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: 5432,
      username: process.env.DB_USERNAME || "johndoe",
      password: process.env.DB_PASSWORD || "johndoe",
      database: process.env.DB_DATABASE || "postgres",
      logging: process.env.DB_LOGGING === "true",
      entities: [
        join(__dirname, "database", "entities", "*.entity.{ts,js}"),
      ],
      synchronize: process.env.DB_SYNCHRONIZE === "true",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export default class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(
      { path: 'v1/*', method: RequestMethod.ALL },
    );
  }
}