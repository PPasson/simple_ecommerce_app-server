import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/database/entities/order.entity";
import { Repository } from "typeorm";
import { Product } from "src/database/entities/product.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(body: CreateOrderDto, userId: number): Promise<Order> {
    //find product from request id
    const findProduct = await this.productRepository.findOne({
      where: { id: body.productId },
    });
    if (!findProduct) {
      throw new BadRequestException("Product not found!");
    }
    const newOrder = new Order();
    newOrder.QTY = body.QTY;
    newOrder.productId = body.productId;
    newOrder.userId = userId;
    newOrder.orderStatus = body.orderStatus;
    newOrder.totalPrice = findProduct.price * body.QTY; //calculate total price
    return await this.orderRepository.save(newOrder);
  }

  async findAll() {
    return this.orderRepository.find();
  }

  async findOne(id: number) {
    const findOrder = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['productId'],
    });
    if (!findOrder) throw new BadRequestException("Order not found!");
    return findOrder;
  }

  //Cancel Order by Update Status to 'canceled'
  async cancelOrder(id: number) {
    const findOrder = await this.orderRepository.findOne({
      where: { id: id },
    });
    if (!findOrder) throw new BadRequestException("Order not found!");
    await this.orderRepository.update(id, { orderStatus: "CANCELED" })
    return ;
  }
}
