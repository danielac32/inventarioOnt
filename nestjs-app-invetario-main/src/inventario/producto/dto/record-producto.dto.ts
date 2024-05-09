import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class ModificacionDto {
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @IsNotEmpty()
  @IsString()
  entregado: string;

  @IsOptional()
  @IsInt()
  id_producto: number;

  @IsNotEmpty()
  @IsInt()
  valor: number;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsInt()
  cedula?: number;
}
