import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { AuthModule } from '../../auth/auth.module';
import { PrismaService } from '../../db-connections/prisma.service';
import {CategoriasModule} from '../categorias/categorias.module'


@Module({
  controllers: [ProductoController],
  providers: [ProductoService,PrismaService],
  imports:[AuthModule,CategoriasModule],
  exports:[ProductoService]
})
export class ProductoModule {}
