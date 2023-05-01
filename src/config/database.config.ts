import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default () =>
  ({
    type: process.env.DB_CONNECTION || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "johndoe",
    password: process.env.DB_PASSWORD || "johndoe",
    database: process.env.DB_DATABASE || "postgres",
    logging: process.env.DB_LOGGING === "true",
    entities: [
      join(__dirname, '..', 'database', 'entities', '*.entity.{ts,js}'),
    ],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  } as TypeOrmModuleOptions);
