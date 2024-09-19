import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartGuard } from './guards/cart.guard';

@Module({
  imports: [],
  providers: [CartService, CartGuard],
  controllers: [CartController],
})
export class CartModule {}
