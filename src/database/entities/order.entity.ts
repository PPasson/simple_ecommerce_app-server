import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "src/database/entities/product.entity";
import { User } from "./user.entity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int4" })
  id: number;

  @ManyToOne(() => Product, product => product.id)
  productId: Product|number;

  @ManyToOne(() => User, user => user.id)
  userId: User|number;

  @Column({ type: "varchar", length: 50, nullable: false })
  productName: string;

  @Column({ type: "int", nullable: false })
  price: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  productStatus: string;

}