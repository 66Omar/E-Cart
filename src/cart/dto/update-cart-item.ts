import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateCartItemDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;
}
