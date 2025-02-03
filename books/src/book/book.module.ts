import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from 'src/rabbitmq.module';

@Module({
  providers: [BookService],
  controllers: [BookController],
  imports: [TypeOrmModule.forFeature([Book]), RabbitMQModule],
})
export class BookModule {}
