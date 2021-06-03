import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerResolver } from './customer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => InvoiceModule),
  ],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
