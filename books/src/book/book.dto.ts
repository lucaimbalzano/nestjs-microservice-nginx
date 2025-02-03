import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: `Narnia - Il Leone della tribu di Giuda` })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: `C.S. Lewis` })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  stock: number;
}

export class UpdateBookDto {
  @ApiProperty({ example: `Narnia - Il Leone della tribu di Giuda` })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({ example: `C.S. Lewis` })
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  author?: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  price?: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  stock?: number;
}

export class DecreaseStockDto extends UpdateBookDto {
  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  quantity?: number;
}
