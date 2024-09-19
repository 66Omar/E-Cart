import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CartGuard } from './guards/cart.guard';
import { UpdateCartItemDto } from './dto/update-cart-item';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { AppResponse } from 'src/common/app-response';

@Controller('carts')
@UseGuards(AuthGuard, CartGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/:cartId')
  async getCart(@Param('cartId', ParseIntPipe) cartId: number) {
    const data = await this.cartService.getCart(cartId);
    return AppResponse('Cart retrieved succesfully', data);
  }

  @Delete('/:cartId/clear/')
  async deleteCart(@Param('cartId', ParseIntPipe) cartId: number) {
    const data = await this.cartService.clearCart(cartId);
    return AppResponse('Cart items removed', data);
  }

  @Get('/:cartId/items')
  async getCardItems(@Param('cartId', ParseIntPipe) cartId: number) {
    const data = await this.cartService.getCartItems(cartId);
    return AppResponse('Cart items retrieved successfully', data);
  }

  @Post('/:cartId/items')
  async addCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Body()
    cartItemDto: CreateCartItemDto,
  ) {
    const data = await this.cartService.createCartItem(cartId, cartItemDto);
    return AppResponse('Item added succesfully to cart', data);
  }

  @Patch('/:cartId/items/:itemId')
  async updateCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() updateItemDto: UpdateCartItemDto,
  ) {
    const data = await this.cartService.updateCartItem(
      cartId,
      itemId,
      updateItemDto,
    );
    return AppResponse('Cart item updated successfully', data);
  }

  @Delete('/:cartId/items/:itemId')
  async deleteCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    const data = await this.cartService.deleteCartItem(cartId, itemId);
    return AppResponse('Cart item deleted successfully', data);
  }
}
