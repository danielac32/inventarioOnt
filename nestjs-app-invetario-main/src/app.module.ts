import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './inventario/categorias/categorias.module';
import { ProductoModule } from './inventario/producto/producto.module';
import { SeedModule } from './seed/seed.module';


@Module({
	 imports: [
	 			AuthModule,
	 			CategoriasModule, 
	 			ProductoModule, 
	 		    SeedModule
	 		],
})
export class AppModule {}
