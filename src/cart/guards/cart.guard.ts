import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CartGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const cartId = Number(request.params.cartId);

    if (isNaN(cartId)) throw new BadRequestException('Invalid ID format');

    return cartId === user.cart_id || user.role === 'ADMIN';
  }
}
