import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import {UserResponseDelete,UserResponseUpdate,UserUpdate,UserResponseEdit,LoginUser,UserResponse,UserResponseList,User} from '../interface/auth-login.interface';
import { ValidRoles } from '../interface/valid-roles'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient,private router: Router) { }

  login(email:string,password:string):Observable<UserResponse>{
    const user :LoginUser={
      email:email,
      password:password
    }
    return this.httpClient.post<UserResponse>(`${ this.baseUrl }/auth/login`, {
      ...user
    });

  }
  allUser():Observable<UserResponseList>{
    const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<UserResponseList>(`${ this.baseUrl }/auth/`,{ headers });
      }
      return new Observable<UserResponseList>();
   }

  deleteUser(id:string):Observable<UserResponseDelete>{
     const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });

          return this.httpClient.delete<UserResponseDelete>(`${ this.baseUrl }/auth/${id}`,{ headers });
      }
      return new Observable<UserResponseDelete>();
  }

 
  getUserById(email:string):Observable<UserResponseEdit>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.get<UserResponseEdit>(`${ this.baseUrl }/auth/${email}`,{ headers });
      }
      return new Observable<UserResponseEdit>();
  }
  
  updateUser(email:string,user:UserUpdate):Observable<UserResponseUpdate>{
  const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
         return this.httpClient.patch<UserResponseUpdate>(`${ this.baseUrl }/auth/${email}`, {
              ...user
          },{ headers });
      }
      return new Observable<UserResponseUpdate>();
  }

  createUser(newUser: User):Observable<User>{
      const token = localStorage.getItem('accessToken');
      if (token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
          });
          return this.httpClient.post<User>(`${ this.baseUrl }/auth/`, {...newUser},{ headers });
      }
      return new Observable<User>();
  } 
 
  isAdmin():boolean{
      if(this.getRol()===ValidRoles.admin)return true;
      return false;
  }
  logout(): void {
    // Eliminar la información de sesión del localStorage
    localStorage.removeItem('accessToken');
    console.log("logout")
    this.router.navigate(['/auth/login']);
  }

   isLoggedIn(): boolean {
    // Verificar si hay un token de acceso en el localStorage
    const token = localStorage.getItem('accessToken');
    if(token === '....'){
        return false;
    }
    return !!token;
  }
 

 formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
}

 padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

tokenTimeRemaining(): string {
    if(!this.isLoggedIn()) return "";
    try {
      const token = localStorage.getItem('accessToken');
      if(token){
          const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
          const currentTime = Math.floor(Date.now() / 1000);
          const timeRemainingInSeconds = expiry - currentTime;
          return this.formatTime(timeRemainingInSeconds);
      }else{
          return '';
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return '';
    }
}

/*
 tokenTimeRemainingInHours(): number {
  const token=localStorage.getItem('accessToken');
    if(token){
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const timeRemainingInSeconds = expiry - currentTime;
      const timeRemainingInHours = timeRemainingInSeconds / 3600;
      return timeRemainingInHours > 0 ? parseFloat(timeRemainingInHours.toFixed(2)) : 0;
    }else{
      return 0;
    }
 }*/


/*
  if (this.tokenExpired(token)) {
    // token expired
  } else {
    // token valid
  }
  */
  tokenExpired() {
    const token=localStorage.getItem('accessToken');
    if(token){
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }return true;//expirado
  }



  getUserName(): string{
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    if(!user) return "";
    return user.name;
  }
  

  getUserEmail(): string{
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    if(!user) return "";
    return user.email;
  }


  getUser(){
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    return user;
  }
  getRol(){
    const userInfo = localStorage.getItem('userCurrent');
    const user = userInfo ? JSON.parse(userInfo) : null;
    if(!user) return "";
    return user.rol;
  }
}
