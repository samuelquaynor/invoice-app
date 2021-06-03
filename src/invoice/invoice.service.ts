import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { Repository } from 'typeorm';
import { CreateInvoiceInput } from './dto/create-invoice.input';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    private customerService: CustomerService,
  ) {}

  async create(invoice: CreateInvoiceInput): Promise<Invoice> {
    const customer = await this.customerService.findOne(invoice.customer);
    const subTotal = invoice.items.reduce((acc, curr) => {
      return acc + Number((curr.rate * curr.quantity).toFixed(2));
    }, 0);

    const taxAmount = subTotal * Number((invoice.taxRate / 100).toFixed(2));
    const total = subTotal * taxAmount;
    const outstandingBalance = total;
    return this.invoiceRepository.save({
      ...invoice,
      customer,
      subTotal,
      taxAmount,
      total,
      outstandingBalance,
    } as any);
  }

  findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.find();
  }

  findOne(id: number): Promise<Invoice> {
    return this.invoiceRepository.findOne(id);
  }

  findByCustomer(id: string): Promise<Invoice[]> {
    return this.invoiceRepository
      .createQueryBuilder('invoice')
      .where('invoice.customer = :id', { id })
      .getMany();
  }
}
