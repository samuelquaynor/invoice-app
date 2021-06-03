import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Customer } from 'src/customer/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GHC = 'GHC',
  GBP = 'GBP',
}

export enum PaymentStatus {
  PAID = 'PAID',
  NOT_PAID = 'NOT_PAID',
}

@ObjectType()
export class Item {
  @Field()
  description: string;

  @Field()
  rate: number;

  @Field()
  quantity: number;
}

@ObjectType()
@Entity()
export class Invoice {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  invoiceNo: string;

  @Field()
  @Column('text')
  description: string;

  @Field((type) => Customer)
  @ManyToOne((type) => Customer, (customer) => customer.invoices)
  customer: Customer;

  @Field()
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.NOT_PAID,
  })
  paymentStatus: PaymentStatus;

  @Field()
  @Column({
    type: 'enum',
    enum: Currency,
    default: Currency.GHC,
  })
  currency: Currency;

  @Field()
  @Column()
  taxRate: number;

  @Field()
  @Column()
  issueDate: string;

  @Field()
  @Column()
  dueDate: string;

  @Field()
  @Column('text')
  note: string;

  @Field((type) => [Item])
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  items: Item[];

  @Field()
  @Column()
  taxAmount: number;

  @Field()
  @Column()
  subTotal: number;

  @Column()
  @Field()
  total: string;

  @Column({
    default: 0,
  })
  @Field()
  amountPaid: number;

  @Column()
  @Field()
  outstandingBalance: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
