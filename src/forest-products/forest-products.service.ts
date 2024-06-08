/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { ForestProduct, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
const cuid = require('cuid');
const QRCode = require('qrcode');
@Injectable()
export class ForestProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllForestProducts(): Promise<ForestProduct[]> {
    return await this.prisma.forestProduct.findMany({
      include: {
        ownerAddress: true,
        guestAddress: true,
        product: true,
      },
    });
  }

  async getForestProductById(id: string): Promise<ForestProduct> {
    return await this.prisma.forestProduct.findUnique({
      where: { id },
      include: {
        ownerAddress: true,
        guestAddress: true,
        product: true,
      },
    });
  }

  async generateQRCode(id: string): Promise<string> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(id);
      return qrCodeDataURL;
    } catch (error) {
      throw new Error(`Error while generating QR code: ${error.message}`);
    }
  }

  async createForestProduct(
    data: Prisma.ForestProductCreateInput,
  ): Promise<ForestProduct> {
    const productId = cuid();
    const qrCodeDataURL = await this.generateQRCode(
      `http://localhost:3000/forest-products/${productId}`,
    );

    data.product.create.qrCode = qrCodeDataURL;
    const productData = {
      ...data.product.create,
      id: productId,
      qrCode: qrCodeDataURL,
    };
    return await this.prisma.forestProduct.create({
      data: {
        ...data,
        ownerAddress: {
          create: data.ownerAddress.create,
        },
        guestAddress: {
          create: data.guestAddress.create,
        },
        product: {
          create: productData,
        },
      },
      include: {
        ownerAddress: true,
        guestAddress: true,
        product: true,
      },
    });
  }

  async updateForestProductById(
    id: string,
    data: Prisma.ForestProductUpdateInput,
  ): Promise<ForestProduct> {
    const findForestProduct = await this.getForestProductById(id);
    if (!findForestProduct) return null;
    return await this.prisma.forestProduct.update({
      where: { id },
      data,
    });
  }

  async deleteForestProductById(id: string): Promise<boolean> {
    const findForestProduct = await this.getForestProductById(id);
    if (!findForestProduct) return false;
    await this.prisma.forestProduct.delete({ where: { id } });
    return true;
  }
}
