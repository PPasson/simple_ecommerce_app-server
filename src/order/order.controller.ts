import { Controller, Get, Post, Body, Request, Patch, Param, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';



@Controller('order')
@ApiTags('Order')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateOrderDto, @Request() req: any) {
    return await this.orderService.create(body, req.user.id);
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne(+id);
  }

  @Patch('/cancel/:id')
  cancel(@Param('id') id: number) {
    return this.orderService.cancelOrder(+id);
  }

}
