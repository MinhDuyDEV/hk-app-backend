import { Module } from '@nestjs/common';
import { ForestProductsService } from './forest-products.service';
import { ForestProductsController } from './forest-products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ForestProductsService],
  controllers: [ForestProductsController],
})
export class ForestProductsModule {}
