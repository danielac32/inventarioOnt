import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { AuthModule } from '../auth/auth.module';
import { CategoriasModule } from '../inventario/categorias/categorias.module'
import { ProductoModule } from '../inventario/producto/producto.module'
import { PrismaService } from '../db-connections/prisma.service';



@Module({
  controllers: [SeedController],
  providers: [SeedService,PrismaService],
  imports:[AuthModule,ProductoModule,CategoriasModule]
})
export class SeedModule {}
