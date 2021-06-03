import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Invoice } from 'src/invoice/entities/invoice.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Customer {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column('text', { nullable: false })
  email: string;

  @Field()
  @Column('varchar', { length: 15 })
  phone: string;

  @Field()
  @Column('text')
  address: string;

  @Field((type) => [Invoice], { nullable: true })
  @OneToMany((type) => Invoice, (invoice) => invoice.customer)
  invoices: Invoice[];

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
