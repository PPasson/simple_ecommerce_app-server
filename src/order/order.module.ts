import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/database/entities/order.entity';
import { Product } from 'src/database/entities/product.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
