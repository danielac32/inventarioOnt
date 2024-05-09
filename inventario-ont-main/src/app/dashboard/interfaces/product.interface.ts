import {category} from './category.interface'
import {User} from '../../auth/interface/auth-login.interface'


export interface addProduct{
  stock: number;
  tipo?:string;
  valor?:number;
  entregado?:string;
}

export interface subProduct{
  stock: number;
  tipo:string;
  valor:number;
  entregado:string;
  observacion:string;
  cedula:number;
}


export interface modUpdate{
  valor:number;
  entregado:string;
  observacion:string;
  cedula:number;
}
export interface mod{
  id?:number;
  createdAt?:string;
  tipo?:string;
  valor:number;
  entregado:string;
  observacion:string;
  cedula:number;
}
export interface getProduct{
  id?:number;
  descripcion: string;
  stock: number;
  codigo: string;
  categoriaId?: number;
  createdAt?:string;
  categoria?:category;
  userId?:number;
  user:User;
  modificaciones:mod[];
}

export interface ModResponse{
    mod:mod;
}

export interface excelReport{
  descripcion: string;
  stock: number;
  codigo: string;
  categoria:string;
  modificaciones:mod[];
}
export interface Product{
  id?:number;
  descripcion: string;
  stock: number;
  codigo: string;
  userId?: number;
  categoriaId: number;
  createdAt?:string;
  categoria?:category;

  //tipo?:string;
  //valor?:number;
  //entregado?:string;
}


export interface productResponseByDate{
  producto:getProduct[];
}

export interface ProductUpdate{
  id?:number;
  descripcion?: string;
  stock?: number;
  codigo?: string;
  userId?: number;
  categoriaId?: number;
  createdAt?:string;
  categoria?:category;
}

export interface productResponseCreate{
  producto:Product;
}

export interface productResponseDelete{
  producto:Product;
}
export interface productResponseUpdate{
  producto:Product;
}

export interface productResponseFindOne{
  producto:getProduct;
}

export interface productResponse{
  producto:Product[];
  meta: Meta;
}

export interface Meta {
  total:    number;
  page:     number;
  lastPage: number;
}
