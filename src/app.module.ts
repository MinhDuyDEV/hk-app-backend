import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ForestProductsModule } from './forest-products/forest-products.module';

@Module({
  imports: [UsersModule, ProductsModule, ForestProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
