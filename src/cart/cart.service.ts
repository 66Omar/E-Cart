import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item';

@Injectable()
export class CartService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getCart(cartId: number) {
    const cart = await this.databaseService.cart.findFirstOrThrow({
      where: { id: cartId },
      include: {
        cart_items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    const total = cart.cart_items.reduce((acc, item) => {
      const subTotal =
        item.quantity * (+item.product.sale_price || +item.product.price);
      item['sub_total'] = subTotal;
      return acc + subTotal;
    }, 0);

    return { ...cart, total };
  }

  async clearCart(cartId: number) {
    return await this.databaseService.cartItem.deleteMany({
      where: { cart_id: cartId },
    });
  }

  async getCartItems(cartId: number) {
    return await this.databaseService.cartItem.findMany({
      where: { cart_id: cartId },
      include: { product: true },
    });
  }

  async createCartItem(cartId: number, cartItemDto: CreateCartItemDto) {
    const { createdCartItem } = await this.databaseService.$transaction(
      async () => {
        const product = await this.databaseService.product.findFirstOrThrow({
          where: { id: cartItemDto.product_id },
        });
        if (product.available_qty < cartItemDto.quantity) {
          throw new BadRequestException(
            `Requested quantity is not available, the available quantity is ${product.available_qty}`,
          );
        }
        const createdCartItem = await this.databaseService.cartItem.create({
          data: { cart_id: cartId, ...cartItemDto },
        });
        return { createdCartItem };
      },
    );
    return createdCartItem;
  }

  async updateCartItem(
    cartId: number,
    itemId: number,
    cartItemDto: UpdateCartItemDto,
  ) {
    return await this.databaseService.$transaction(async (prisma) => {
      const cartItem = await prisma.cartItem.findUniqueOrThrow({
        where: { id: itemId, cart_id: cartId },
        include: {
          product: true,
        },
      });

      if (cartItem.product.available_qty < cartItemDto.quantity) {
        throw new BadRequestException(
          `Requested quantity is not available, the available quantity is ${cartItem.product.available_qty}`,
        );
      }

      const updatedCartItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: cartItemDto,
      });

      return updatedCartItem;
    });
  }

  async deleteCartItem(cartId: number, itemId: number) {
    return await this.databaseService.cartItem.delete({
      where: {
        id: itemId,
        cart_id: cartId,
      },
    });
  }
}
