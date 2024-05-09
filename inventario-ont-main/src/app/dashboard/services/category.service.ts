import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import {categoryUpdate,categoryResponse,category} from '../interfaces/category.interface'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private baseUrl = environment.apiUrl;//'http://localhost:4000';
constructor(private httpClient: HttpClient,private router: Router) { }



  update(id:string,category:category):Observable<categoryUpdate>{
  const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         return this.httpClient.patch<categoryUpdate>(`${ this.baseUrl }/categorias/${id}`, {
              ...category
          },{ headers });
      }
      return new Observable<categoryUpdate>();
  }

remove(id:string):Observable<category>{
 const token = localStorage.getItem('accessToken');
    if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.httpClient.delete<category>(`${ this.baseUrl }/categorias/${id}`,{ headers });
    }
 return new Observable<category>();
}

create(category:category):Observable<category>{

  const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.post<category>(`${ this.baseUrl }/categorias`, {...category},{ headers });
      }
  return new Observable<category>();
}


findAll():Observable<categoryResponse>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<categoryResponse>(`${ this.baseUrl }/categorias/`,{ headers });
      }
      return new Observable<categoryResponse>();

}



}
