import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { CreateCustomerInput } from './dto/create-customer.input';
import { InvoiceService } from 'src/invoice/invoice.service';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private readonly customerService: CustomerService,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Mutation(() => Customer)
  createCustomer(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
  ) {
    return this.customerService.create(createCustomerInput);
  }

  @Query(() => Customer)
  async customers(): Promise<Customer[]> {
    return await this.customerService.findAll();
  }

  @Query(() => Customer)
  async customer(@Args('id') id: string): Promise<Customer> {
    return await this.customerService.findOne(id);
  }

  @ResolveField(() => [Invoice])
  async invoices(@Parent() customer): Promise<Invoice[]> {
    const { id } = customer;
    console.log(customer);
    return this.invoiceService.findByCustomer(id);
  }
}
