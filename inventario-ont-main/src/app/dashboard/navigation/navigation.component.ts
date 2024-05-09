import { Component, inject ,OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router ,NavigationExtras} from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateProductComponent } from '../component/create-product/create-product.component'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Product} from '../interfaces/product.interface'
import {ProductService} from '../services/product.service'
import {CategoryComponent} from '../component/category/category.component'
import {ReportComponent} from '../component/report/report.component'


import {MessageService} from '../services/subjectService';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    CommonModule,
    RouterModule,
    HttpClientModule,
    RouterLink,
    RouterOutlet,
    MatTooltipModule,
  ],
  providers: [AuthService,ProductService]
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean>;
  user?:string;
  rol?:string;
  admin?:boolean;
  tokenExpire?:string;

  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private router: Router,
              public authService: AuthService,
              private productService:ProductService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private messageService: MessageService
              ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
  }
 
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      //this.rol = params['rol'];
      //this.user = params['name'];
    });
    this.user=this.authService.getUserName()
    this.admin=this.authService.isAdmin();
    this.getData();
    setInterval(() => {
      this.getData();
    }, 5000);
  }

  getData(): void {
    this.tokenExpire=this.authService.tokenTimeRemaining();
  }


  logout(): void {
      this.authService.logout();
      //this.router.navigate(['/auth/login']);
  }
  
  
  report(){
      const dialogRef = this.dialog.open(ReportComponent, {
            width: '200px',
            height: '300px',
            data: {
              title: 'Reporte'
            }
      });
      dialogRef.afterClosed().subscribe(response => {
          if(response!==undefined){
               if(response.error){
                  this.openSnackBar(response.status, 'Cerrar');
               }
               this.openSnackBar(response.status, 'Cerrar');
          }else{
            console.log("error: salio del formulario")
          }
      }, error => {
            this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
      });
  }
  crearCategoria(){
      const dialogRef = this.dialog.open(CategoryComponent, {
            width: '500px',
            height: '600px',
            data: {
              title: 'Categorias'
            }
      });
      dialogRef.afterClosed().subscribe(response => {
          if(response!==undefined){
               
          }else{
            console.log("error: salio del formulario")
          }
      }, error => {
            this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
             
      });

  }

  crearProducto():void {
      const dialogRef = this.dialog.open(CreateProductComponent, {
            width: '450px',
             height: '450px',
            data: {
              title: 'Crear Producto'
            }
      });
      dialogRef.afterClosed().subscribe((response:Product) => {
          if(response!==undefined){
               this.productService.create(response).subscribe(response => {
                   this.openSnackBar('Producto Creado', 'Cerrar');
                   this.messageService.sendMessage({
                          receiver:"index-products"
                   });
                   this.router.navigate(['/nav/products']);
               }, error => {
                  console.error('Error en la solicitud :', error);
                  this.openSnackBar('No se creo el producto', 'Cerrar');
               });
          }else{
            console.log("error: salio del formulario")
          }
      }, error => {
            this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
             
      });
  }

 
  listaProducto():void{
     /* const parametros: NavigationExtras = {
        queryParams: {
          reload:true
        }
      };*/
      this.router.navigate(['/nav/products']);
  }

}
