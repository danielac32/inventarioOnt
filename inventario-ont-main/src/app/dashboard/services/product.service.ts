import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import {
     modUpdate,
     ModResponse,
     productResponseFindOne,
     productResponseByDate,
     subProduct,
     addProduct,
     productResponseUpdate,
     ProductUpdate,
     productResponseDelete,
     productResponseCreate,
     Product,
     productResponse} from '../interfaces/product.interface'


import * as XLSX from 'xlsx';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl = environment.apiUrl;//'http://localhost:4000';
constructor(private httpClient: HttpClient,private router: Router) { }
  
  
  

  generarExcel(data: any[], nombreArchivo: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
  }

  
   
   deleteMod(id:string):Observable<ModResponse>{
     const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          return this.httpClient.delete<ModResponse>(`${ this.baseUrl }/producto/modDelete${id}`,{ headers });
      }
      return new Observable<ModResponse>();
  }

   updateModProduct(idProducto:string,idMod:string,mod:modUpdate):Observable<ModResponse>{
      const token = localStorage.getItem('accessToken');
        if (token) {
            const headers = new HttpHeaders({
              'Authorization': `Bearer ${token}`
            });
           return this.httpClient.patch<ModResponse>(`${ this.baseUrl }/producto/modProduct?idP=${ idProducto }&idM=${idMod}`, {
                ...mod
            },{ headers });
        }
        return new Observable<ModResponse>();
   }


  getModProduct(idProducto:string,idMod:string):Observable<ModResponse>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         // return this.httpClient.post<productResponseUpdate>(`${ this.baseUrl }/producto/stockAdd/?id=${ id }&stock=${stock}`, {},{ headers });
         return this.httpClient.get<ModResponse>(`${ this.baseUrl }/producto/mod?idP=${ idProducto }&idM=${idMod}`,{ headers });
      }

    return new Observable<ModResponse>();
  }


  getProducts(init:string,end:string):Observable<productResponseByDate>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         // return this.httpClient.post<productResponseUpdate>(`${ this.baseUrl }/producto/stockAdd/?id=${ id }&stock=${stock}`, {},{ headers });
         return this.httpClient.get<productResponseByDate>(`${ this.baseUrl }/producto/date?init=${ init }&end=${end}`,{ headers });
      }

    return new Observable<productResponseByDate>();
  }


  updateStockAdd(id:string,add:addProduct):Observable<productResponseUpdate>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         // return this.httpClient.post<productResponseUpdate>(`${ this.baseUrl }/producto/stockAdd/?id=${ id }&stock=${stock}`, {},{ headers });
         return this.httpClient.post<productResponseUpdate>(`${ this.baseUrl }/producto/stockAdd/?id=${ id }`, {...add},{ headers });
      }

    return new Observable<productResponseUpdate>();
  }

  updateStockSub(id:string,sub:subProduct):Observable<productResponseUpdate>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.post<productResponseUpdate>(`${ this.baseUrl }/producto/stockSub/?id=${ id }`, {...sub},{ headers });
      }

    return new Observable<productResponseUpdate>();
  }

  findOne(id:string):Observable<productResponseFindOne>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<productResponseFindOne>(`${ this.baseUrl }/producto/${id}`,{ headers });
      }
      return new Observable<productResponseFindOne>();
  }


  update(id:string,producto:ProductUpdate):Observable<productResponseUpdate>{
  const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         return this.httpClient.patch<productResponseUpdate>(`${ this.baseUrl }/producto/${id}`, {
              ...producto
          },{ headers });
      }
      return new Observable<productResponseUpdate>();
  }

  delete(id:string):Observable<productResponseDelete>{
     const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          return this.httpClient.delete<productResponseDelete>(`${ this.baseUrl }/producto/${id}`,{ headers });
      }
      return new Observable<productResponseDelete>();
  }

  create(product:Product):Observable<productResponseCreate>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.post<productResponseCreate>(`${ this.baseUrl }/producto`, {...product},{ headers });
      }

    return new Observable<productResponseCreate>();
  }
  findAll(limit: number = 10, page: number = 1):Observable<productResponse>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<productResponse>(`${ this.baseUrl }/producto?limit=${ limit }&page=${page}`,{ headers });
      }

    return new Observable<productResponse>();
  }

}
