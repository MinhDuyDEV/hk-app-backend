import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  scientificName?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  type?: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsNotEmpty()
  qrCode: string;

  @IsString()
  @IsOptional()
  note?: string;
}
