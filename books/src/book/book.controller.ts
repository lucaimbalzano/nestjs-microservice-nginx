import { Controller, Get, Inject, Param, Body, Patch } from '@nestjs/common';
import { BookService } from './book.service';
import {
  ClientProxy,
  Payload,
  MessagePattern,
  EventPattern,
} from '@nestjs/microservices';
import { Book } from './book.entity';
import { DecreaseStockDto } from './book.dto';
// @ts-ignore
import { ACTION_IDENTIFIERS } from '../../common/constants/general.constants';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @MessagePattern(ACTION_IDENTIFIERS.GET_BOOK)
  async handleGetBook(@Payload() data: { bookId: string }) {
    const { bookId } = data;
    return await this.bookService.getBook(bookId);
  }

  @MessagePattern(ACTION_IDENTIFIERS.IS_BOOK_IN_STOCK)
  async handleIsBookInStock(
    @Payload() data: { bookId: string; quantity: number },
  ): Promise<boolean> {
    const { bookId, quantity } = data;
    return await this.bookService.isBookInStock(bookId, quantity);
  }

  @EventPattern(ACTION_IDENTIFIERS.DECREASE_STOCK)
  async handleDecreaseStock(
    @Payload() data: { bookId: string; quantity: number },
  ): Promise<Book> {
    const { bookId, quantity } = data;
    return await this.bookService.decreaseStock(bookId, quantity);
  }

  @Patch('/:id')
  async increaseStock(
    @Param('id') bookId: string,
    @Body() body: DecreaseStockDto,
  ) {
    const { quantity } = body;
    console.log('Increase stock request received:', bookId, quantity);
    return await this.bookService.increaseStock(bookId, quantity);
  }
}
