import { Injectable, HttpStatus,ConflictException,NotFoundException,ExceptionFilter,HttpException, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../../db-connections/prisma.service';


@Injectable()
export class CategoriasService {

  constructor(
    private prisma: PrismaService,
    ) {}

  async create(createCategoriaDto: CreateCategoriaDto) {
    try{
        const categorias = await this.prisma.categoria.create({
                data:{
                    ...createCategoriaDto,
                }
        });
        return {
            categorias
        }
    } catch (error) {
            throw new HttpException('Error creating categoria', 500);
    }
  }

  async findAll() {
    const categoria = await this.prisma.categoria.findMany();
      return{
        categoria
      }
  }
  

  private async getCategoria(id:string) {
    try{
        const categoria = await this.prisma.categoria.findFirst({
            where: {
                    id: Number(id)
            }
        });
        return categoria;
    } catch (error) {
        throw new HttpException('Error findOne categoria', 500);
    }
  }

  async findOne(id: string) {
      const categoria= await this.getCategoria(id);
      if(!categoria)throw new NotFoundException(`Entity with ID ${id} not found`);
      return {
          categoria
      }
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria= await this.getCategoria(id);
    if(!categoria)throw new NotFoundException(`Entity with ID ${id} not found`);

    const updatedCategoria = await this.prisma.categoria.update({
        where: {
          id: categoria.id
        },
        data:{
          ...updateCategoriaDto
        }
    });
    return {updateCategoriaDto};
  }

  async remove(id: string) {
    const categoria=await this.getCategoria(id);
    if(!categoria)throw new NotFoundException(`Entity with ID ${id} not found`);

    const deletedCategoria = await this.prisma.categoria.delete({
      where: {
        id: categoria.id
      },
    });
    return {deletedCategoria}
  }
}
