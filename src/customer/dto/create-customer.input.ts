import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsInt } from 'class-validator';

@InputType()
export class CreateCustomerInput {
  @Field()
  @IsAlpha()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsInt()
  phone: string;

  @Field()
  address: string;
}
