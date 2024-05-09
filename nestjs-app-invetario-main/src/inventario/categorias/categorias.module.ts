import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { PrismaService } from '../../db-connections/prisma.service';
@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService,PrismaService],
  imports:[],
  exports:[CategoriasService]
})
export class CategoriasModule {}
