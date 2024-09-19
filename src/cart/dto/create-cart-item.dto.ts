import { IsNumber, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  product_id: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
