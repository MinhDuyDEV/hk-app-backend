import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return await this.prisma.product.create({ data });
  }

  async updateProductById(
    id: string,
    data: Prisma.ProductUpdateInput,
  ): Promise<Product> {
    const findProduct = await this.getProductById(id);
    if (!findProduct) return null;
    return await this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProductById(id: string): Promise<boolean> {
    const findProduct = await this.getProductById(id);
    if (!findProduct) return false;
    await this.prisma.product.delete({ where: { id } });
    return true;
  }
}
