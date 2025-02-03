import {
  Controller,
  Post,
  Body,
  Inject,
  NotFoundException,
  BadRequestException,
  ServiceUnavailableException,
  Param,
  Delete,
  Response,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './order.dto';
import axios from 'axios';

import {
  SERVICES_NAME,
  SERVICES_PORTS,
  ACTION_IDENTIFIERS, // @ts-ignore
} from '../../common/constants/general.constants';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('BOOK_SERVICE') private readonly bookClient: ClientProxy,
    @Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
  ) {}

  @Post('/')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { bookId, customerId, quantity } = createOrderDto;

    let customer, book;
    try {
      customer = await this.customerClient.send(
        ACTION_IDENTIFIERS.GET_CUSTOMER,
        { customerId },
      );
      book = await this.bookClient.send(ACTION_IDENTIFIERS.GET_BOOK, {
        bookId,
      });
    } catch (error) {
      throw new ServiceUnavailableException(
        'Service unavailable, please try again later',
      );
    }

    if (!customer) throw new NotFoundException('Customer not found');
    if (!book) throw new NotFoundException('Book not found');

    const isBookInStock = await this.bookClient.send(
      ACTION_IDENTIFIERS.IS_BOOK_IN_STOCK,
      {
        bookId,
        quantity,
      },
    );
    if (!isBookInStock)
      throw new BadRequestException('Not enough books in stock');

    const order = await this.orderService.createOrder(createOrderDto);
    this.bookClient.emit(ACTION_IDENTIFIERS.DECREASE_STOCK, {
      bookId,
      quantity,
    });

    return order;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteOrder(@Param('id') orderId: string, @Response() res: any) {
    const order = await this.orderService.getOrder(orderId);
    const { bookId, quantity } = order;
    console.log('deleteOrder:getOrder::', order);

    // Delete the order
    const result = await this.orderService.deleteOrder(orderId);
    console.log('deleteOrder:deleteOrder::', result);
    try {
      // Http request to book service add back the book in stock
      await axios.patch(
        `http://${SERVICES_NAME.BOOK}:${SERVICES_PORTS.BOOK}/book/${bookId}`,
        {
          quantity,
        },
      );

      // Return success response if stock update was successful
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Order deleted successfully and stock updated',
      });
    } catch (error) {
      console.error('Error updating book stock:', error);

      // Rollback: Re-create the deleted order if stock update fails
      await this.orderService.createOrder(order);

      throw new InternalServerErrorException(
        'Failed to update stock, order rollback performed',
      );
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getOrder(@Param('id') orderId: string) {
    const order = await this.orderService.getOrder(orderId);
    if (!order) {
      throw new NotFoundException(
        `Resource not found, order id required [${orderId}]`,
      );
    }
    return order;
  }
}
