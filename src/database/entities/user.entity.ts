import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int4" })
  id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  firstName: string;
  
  @Column({ type: "varchar", length: 50, nullable: false })
  lastName: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  phone: string;
  
  @Column({ type: "varchar", length: 50, nullable: true })
  email: string;
  
  @Column({ type: "varchar", length: 50, nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  status: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  address: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  district: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  city: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  province: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  postcode: string;

  @OneToMany(() => Order, (order) => order.userId)
  order: Order[];
}
