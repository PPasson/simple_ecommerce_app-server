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

  @Column({ type: "int", nullable: false })
  QTY: number;

  @Column({ type: "int", nullable: false })
  totalPrice: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  orderStatus: string;

}