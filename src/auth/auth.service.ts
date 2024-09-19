import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto['password'] = await bcrypt.hash(
      createUserDto['password'],
      10,
    );
    createUserDto.re_password = undefined;
    const { createdUser, createdCart } =
      await this.databaseService.$transaction(async (prisma) => {
        const createdUser = await prisma.user.create({
          data: createUserDto,
        });

        const createdCart = await prisma.cart.create({
          data: { user_id: createdUser.id },
        });

        return { createdUser, createdCart };
      });
    return {
      username: createdUser.username,
      email: createdUser.email,
      role: createdUser.role,
      cart: createdCart.id,
    };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: loginUserDto.email },
      omit: { password: false },
      include: {
        cart: true,
      },
    });

    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      return {
        token: this.jwtService.sign({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          cart_id: user.cart.id,
        }),
      };
    }

    throw new UnauthorizedException('Invalid user email or password');
  }

  async authenticateUser(authorization: string) {
    if (!authorization)
      throw new UnauthorizedException(
        'You must be signed in, authorization token missing',
      );
    const token = authorization?.split(' ')[1];
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch {
      throw new UnauthorizedException(
        'Invalid token, token has either been expired or corrupted',
      );
    }
  }
}
