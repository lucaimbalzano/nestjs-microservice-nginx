import { Controller } from '@nestjs/common';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
// @ts-ignore
import { ACTION_IDENTIFIERS } from '../../common/constants/general.constants';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern(ACTION_IDENTIFIERS.GET_CUSTOMER)
  async handleGetCustomer(@Payload() data: { customerId: string }) {
    const { customerId } = data;
    return await this.customerService.getCustomer(customerId);
  }
}