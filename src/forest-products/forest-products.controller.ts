import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ForestProductsService } from './forest-products.service';
import { CreateForestProductsDto } from './dtos/CreateForestProducts.dto';
import { UpdateForestProductsDto } from './dtos/UpdateForestProductsDto.dto';

@Controller('forest-products')
export class ForestProductsController {
  constructor(private readonly forestProductsService: ForestProductsService) {}

  @Get()
  async getAllForestProducts() {
    return await this.forestProductsService.getAllForestProducts();
  }

  @Get(':id')
  async getForestProductById(@Param('id') id: string) {
    return await this.forestProductsService.getForestProductById(id);
  }

  @Post()
  async createForestProduct(
    @Body() createForestProductsDto: CreateForestProductsDto,
  ) {
    return await this.forestProductsService.createForestProduct(
      createForestProductsDto,
    );
  }

  @Patch(':id')
  async updateForestProductById(
    @Param('id') id: string,
    @Body() updateForestProductsDto: UpdateForestProductsDto,
  ) {
    return await this.forestProductsService.updateForestProductById(
      id,
      updateForestProductsDto,
    );
  }

  @Delete(':id')
  async deleteForestProductById(@Param('id') id: string) {
    return await this.forestProductsService.deleteForestProductById(id);
  }
}
