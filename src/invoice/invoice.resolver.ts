import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { Customer } from 'src/customer/entities/customer.entity';
import { CustomerService } from 'src/customer/customer.service';

@Resolver(() => Invoice)
export class InvoiceResolver {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly customerService: CustomerService,
  ) {}

  @Mutation(() => Invoice)
  async createInvoice(
    @Args('invoice') createInvoiceInput: CreateInvoiceInput,
  ): Promise<Invoice> {
    return await this.invoiceService.create(createInvoiceInput);
  }

  @Query(() => [Invoice], { name: 'invoice' })
  async invoices() {
    return await this.invoiceService.findAll();
  }

  @Query(() => Invoice, { name: 'invoice' })
  async invoice(@Args('id', { type: () => Int }) id: number) {
    return await this.invoiceService.findOne(id);
  }

  @ResolveField(() => Customer)
  async customer(@Parent() invoice) {
    const { customer } = invoice;
    return this.customerService.findOne(customer);
  }

  // @Mutation(() => Invoice)
  // updateInvoice(@Args('updateInvoiceInput') updateInvoiceInput: UpdateInvoiceInput) {
  //   return this.invoiceService.update(updateInvoiceInput.id, updateInvoiceInput);
  // }

  // @Mutation(() => Invoice)
  // removeInvoice(@Args('id', { type: () => Int }) id: number) {
  //   return this.invoiceService.remove(id);
  // }
}
