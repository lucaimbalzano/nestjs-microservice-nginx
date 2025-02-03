import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsUUID()
  id?: string;

  @ApiProperty({ example: `02044837-b360-4d6b-97a6-334eef93fdcd` })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({ example: `01f4acc3-dd65-46ce-8c5a-ef3ca363cb6d` })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  customerId: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;
}
