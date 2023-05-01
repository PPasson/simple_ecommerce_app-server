import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Order } from 'src/database/entities/order.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getAllOrderHostory(userId: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        userId: userId,
      },
    });
  }
}
