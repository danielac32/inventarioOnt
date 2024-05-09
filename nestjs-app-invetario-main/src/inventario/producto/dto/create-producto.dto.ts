
import { IsPositive ,IsNotEmpty, IsString, IsInt, IsDateString ,MaxLength, MinLength,IsOptional } from 'class-validator';
 
 import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class CreateProductoDto {

  @IsOptional()
  id: number;


  /*@ApiProperty({
    example: "User name",
    description: "Name of your user",
  })*/
  

  @IsOptional()
  @IsString()
  tipo: string;

  @IsOptional()
  valor: number;
  
  @IsOptional()
  @IsString()
  entregado: string;
  
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsString()
  codigo: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  categoriaId: number;
}


export class AddStockDto{

  @IsInt()
  stock: number;

  @IsString()
  tipo: string;

  @IsPositive()
  @IsInt()
  valor: number;

  @IsString()
  entregado: string;
}

export class SubStockDto{

  @IsInt()
  stock: number;

  @IsString()
  tipo: string;
  
  @IsPositive()
  @IsInt()
  valor: number;

  @IsString()
  entregado: string;


  @IsOptional()
  @IsString()
  observacion: string;
  
  @IsOptional()
  @IsInt()
  cedula: number;

}

export class UpdateMod{

  @IsPositive()
  @IsInt()
  valor: number;

  @IsString()
  entregado: string;

  @IsOptional()
  @IsString()
  observacion: string;
  
  @IsOptional()
  @IsInt()
  cedula: number;

}