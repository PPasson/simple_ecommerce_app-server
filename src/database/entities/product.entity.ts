import { Expose } from "class-transformer";
import { Order } from "src/database/entities/order.entity";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int4" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  productName: string;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  productStatus: string;

  @OneToMany(() => Order, (order) => order.productId)
  order: Order[];
}