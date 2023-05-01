import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from 'src/database/entities/product.entity';
import { Repository } from "typeorm";


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(body: CreateProductDto): Promise<Product> {
    return await this.productRepository.save({...body})
  }

  async findAll() {
    return this.productRepository.find()
  }

  async findOne(id: number) {
    const findProduct = await this.productRepository.findOne({
      where: { id: id},
    });
    if(!findProduct) throw new BadRequestException('Product not found!');
    return findProduct;
  }

}
