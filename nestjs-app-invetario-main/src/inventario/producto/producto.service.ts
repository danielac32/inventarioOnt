import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateProductoDto ,AddStockDto,SubStockDto,UpdateMod} from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from '../../db-connections/prisma.service';
import { CategoriasService } from '../categorias/categorias.service'
import { AuthService } from '../../auth/auth.service'


@Injectable()
export class ProductoService {

  constructor(
    private prisma: PrismaService,
    private categoriasService: CategoriasService,
    private authService: AuthService
    ) {}

  
  

  private async getModificacion(id:number) {
    try{
        const mod = await this.prisma.modificacion.findFirst({
            where: {
                    id
            }
        });
        return mod;
    } catch (error) {
        throw new HttpException('Error findOne modificacion', 500);
    }
  }


  async removeMod(id: number) {
    const mod= await this.getModificacion(Number(id));
    if(!mod)throw new NotFoundException(`Entity with ID ${id} not found`);

    const modificacion = await this.prisma.modificacion.delete({
      where: {
        id
      },
    });
    return {modificacion}
  }


  async updateModProduct(idP:string,idM:string,updateMod: UpdateMod){
        const producto= await this.getProducto(Number(idP));
        if(!producto)throw new NotFoundException(`Entity with ID ${idP} not found`);
        const updatedMod = await this.prisma.modificacion.update({
            where: {
              id: Number(idM)
            },
            data:{
              ...updateMod
            }
        });
        return {
        updatedMod
      }
  }

  async getModProduct(idP:string,idM:string){
      const producto= await this.getProducto(Number(idP));
      if(!producto)throw new NotFoundException(`Entity with ID ${idP} not found`);
      const mod= await this.prisma.modificacion.findFirst({
            where: {
                    id:Number(idM)
            }
      });
      return {
        mod
      }
  }


  async getProducts(init:string, end:string){
      try{
           const producto = await this.prisma.producto.findMany({
             where:{
                 createdAt: 
                        { 
                            gte: new Date(init).toISOString(), 
                            lte: new Date(end).toISOString() 
                        } 
             },
             include:{
                    categoria:true,
                    user:true,
                    modificaciones:true
             }
          });
          return{
              producto
          }
      }catch (error) {
          console.log(error)
          throw new HttpException(error, 500);
      }
  }
  async updateStockAdd(id:string,addStockDto: AddStockDto){

      //console.log(id,stock)
      const producto= await this.getProducto(Number(id));
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
      const {stock , ...dataProducto}=addStockDto;

      let stockp=producto.stock;
      let stockValue=Number(stock);
      if(stockValue<0){//si es negativo
        //error
        throw new HttpException('El valor es negativo', 500);
      }else{
        stockp = stockp+stockValue;
        if(stockp<0){
           throw new HttpException('la cantidad resultante es negativa ', 500);
        }
      }
      const updatedProducto = await this.prisma.producto.update({
          where: {
            id: Number(id)
          },
          data:{
            stock:stockp,
            modificaciones: {
              create: {
                ...dataProducto
              }
            }
          }
      });

      return {
            updatedProducto
        }
  }




async updateStockSub(id:string,subStockDto: SubStockDto ){

      //console.log(id,stock)
      const producto= await this.getProducto(Number(id));
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
      const {stock , ...dataProducto}=subStockDto;

      let stockp=producto.stock;
      let stockValue=Number(stock);
      if(stockValue<0){//si es negativo
        //error
        throw new HttpException('El valor es negativo', 500);
      }else{
        stockp = stockp-stockValue;
        if(stockp<0){
           throw new HttpException('la cantidad resultante es negativa ', 500);
        }
      }
      const updatedProducto = await this.prisma.producto.update({
          where: {
            id: Number(id)
          },
          data:{
            stock:stockp,
            modificaciones: {
              create: {
                ...dataProducto
              }
            }
          }
      });

      return {
            updatedProducto
        }
  }

/*
async updateStockSub(id:string,stock:string){

      //console.log(id,stock)
      const producto= await this.getProducto(Number(id));
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);

      let stockp=producto.stock;
      let stockValue=Number(stock);
      if(stockValue<0){//si es negativo
        //error
        throw new HttpException('El valor es negativo', 500);
      }else{
        stockp = stockp-stockValue;
      }
      const updatedProducto = await this.prisma.producto.update({
          where: {
            id: Number(id)
          },
          data:{
            stock:stockp
          }
      });

      return {
            updatedProducto
        }
  }
*/

  async create(createProductoDto: CreateProductoDto) {
    try{
         
        const {tipo,valor,entregado,...dataProducto} = createProductoDto;

        const producto = await this.prisma.producto.create({
                data:{
                    ...dataProducto,
                    modificaciones: {
                      create: {
                        tipo,
                        valor,
                        entregado
                      }
                    }
                }
        });
        return {
            producto
        }
    } catch (error) {
            throw new HttpException('Error creating producto', 500);
    }
  }

  async findAll(limit: number=5, page: number=1) {
    try{

        const [total, producto] = await Promise.all([
                                  this.prisma.producto.count(),
                                  this.prisma.producto.findMany({
                                      include: {
                                          categoria:true,
                                      },
                                      skip: Number((page -1 )* limit),
                                      take: Number(limit),
                                  })
      ]);

      const lastPage = Math.ceil(total / limit);

      return {
          producto,
          meta:{
                total,
                page,
                lastPage
          }
      };
    }catch (error) {
          console.log(error)
          throw new HttpException(error, 500);
    }
    /*const producto = await this.prisma.producto.findMany({
       include:{
              categoria:true,
       }
    });

    return{
      producto,
      meta: {
          total:0,
          page:0,
          lastPage:0
      }
    }*/
  }
  private async getProducto(id:number) {
    try{
        const producto = await this.prisma.producto.findFirst({
            where: {
                    id
            },
            include:{
              categoria:true,
              user:true,
              modificaciones:true
            }
        });
        return producto;
    } catch (error) {
        throw new HttpException('Error findOne producto', 500);
    }
  }


  async findOne(id: number) {
    const producto= await this.getProducto(id);
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          producto
      }
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const producto= await this.getProducto(id);
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
      const updatedProducto = await this.prisma.producto.update({
        where: {
          id: producto.id
        },
        data:{
          ...updateProductoDto
        }
    });
    return {updatedProducto};
  }

  async remove(id: number) {
    const producto= await this.getProducto(id);
      if(!producto)throw new NotFoundException(`Entity with ID ${id} not found`);
     
      const list = await this.prisma.modificacion.findMany({
        where: {
          id_producto: producto.id,
        },
      });
      await Promise.all(list.map(modificacion => this.prisma.modificacion.delete({ where: { id: modificacion.id } })));
      // console.log(modificaciones)
      const deletedProducto = await this.prisma.producto.delete({
      where: {
        id: producto.id
      },
    });
    return {deletedProducto}
  }
}
