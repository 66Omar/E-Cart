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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminsOnly } from 'src/auth/guards/admin.guard';
import { ProductUpdateDto } from './dto/update-product.dto';
import { AppResponse } from 'src/common/app-response';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    const data = await this.productService.getAllProducts();
    return AppResponse('Products retrieved successfully', data);
  }

  @Post()
  @UseGuards(AuthGuard, AdminsOnly)
  async createProduct(@Body() productCreateDto: CreateProductDto) {
    const data = await this.productService.createProduct(productCreateDto);
    return AppResponse('Product created successfully!', data);
  }

  @Get('/:productId/')
  async getProductByproductId(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const data = await this.productService.getOneProduct(productId);
    return AppResponse('Product retrieved successfully!', data);
  }

  @Patch('/:productId/')
  @UseGuards(AuthGuard, AdminsOnly)
  async updateProductByproductId(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() productUpdateDto: ProductUpdateDto,
  ) {
    const data = await this.productService.updateProduct(
      productId,
      productUpdateDto,
    );
    return AppResponse('Product updated successfully', data);
  }

  @Delete('/:productId/')
  @UseGuards(AuthGuard, AdminsOnly)
  async deleteProductByproductId(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    const data = await this.productService.deleteProduct(productId);
    return AppResponse('Product deleted successfully', data);
  }
}
