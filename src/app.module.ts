import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    GraphQLModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'Millions$22',
      port: 5432,
      host: '127.0.0.1',
      database: 'invoiceapp',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    InvoiceModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
