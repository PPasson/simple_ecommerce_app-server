import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
