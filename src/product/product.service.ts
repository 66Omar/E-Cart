import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllProducts() {
    return await this.databaseService.product.findMany();
  }

  async getOneProduct(id: number) {
    return await this.databaseService.product.findFirstOrThrow({
      where: { id: id },
    });
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.databaseService.product.create({
      data: createProductDto,
    });
  }

  async updateProduct(id: number, updateProductDto: ProductUpdateDto) {
    return await this.databaseService.product.update({
      data: updateProductDto,
      where: { id: id },
    });
  }

  async deleteProduct(id: number) {
    return await this.databaseService.product.delete({ where: { id: id } });
  }
}
