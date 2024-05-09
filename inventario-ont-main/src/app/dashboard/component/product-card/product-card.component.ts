import { Component ,Input ,OnInit} from '@angular/core';
import {Product} from '../../interfaces/product.interface'
import { RouterLink,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router,ParamMap } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {ProductService} from '../../services/product.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import {MessageService} from '../../services/subjectService';
import {AddStockComponent} from '../add-stock/add-stock.component';
import {SubtractionStockComponent} from '../subtraction-stock/subtraction-stock.component'
import { MatDialog } from '@angular/material/dialog';
import {DetailComponent} from '../detail/detail.component'


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    RouterLink, 
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule
    ],
  providers:[ProductService],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
@Input() public producto?: Product;
 constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService:ProductService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private messageService: MessageService
  ) {}
    

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 2000, // Duración en milisegundos
        verticalPosition: 'top', // Posición vertical de la alerta
        horizontalPosition: 'end', // Posición horizontal de la alerta
        panelClass: ['green']
      });
    }

 

    ngOnInit(): void {
      if(this.producto){
        
      }
    }

    addStock(id?:string){
       if(id!==undefined){
          const dialogRef = this.dialog.open(AddStockComponent, {
                width: '200px',
                height: '180px',
                data: {
                  title: 'Añadir al stock',
                  id
                }
          });
          dialogRef.afterClosed().subscribe(response => {
              if(response!==undefined){
                  if(response.error){
                      this.openSnackBar(response.status, 'Cerrar');
                   }
                   this.openSnackBar(response.status, 'Cerrar');
                   this.returnIndex();
              }else{
                //console.log("error: salio del formulario")
              }
          }, error => {
                this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
                 
          });
          //this.openSnackBar('Sumado al stock', 'Cerrar');
          //this.returnIndex();
       }
    }

    subtraStock(id?:string){
       if(id!==undefined){
          const dialogRef = this.dialog.open(SubtractionStockComponent, {
                width: '300px',
                height: '430px',
                data: {
                  title: 'Restar al stock',
                  id
                }
          });
          dialogRef.afterClosed().subscribe(response => {
              if(response!==undefined){
                   if(response.error){
                      this.openSnackBar(response.status, 'Cerrar');
                   }
                   this.openSnackBar(response.status, 'Cerrar');
                   this.returnIndex();
              }else{
                //console.log("error: salio del formulario")
              }
          }, error => {
                this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
                 
          });
          //this.openSnackBar('Sumado al stock', 'Cerrar');
          //this.returnIndex();
       }
    }
    delete(id?:string){
       if(id!==undefined){
           this.productService.delete(id).subscribe(response => {
              console.log("producto eliminado ")
              this.openSnackBar('Producto eliminado', 'Cerrar');
              this.returnIndex();
           }, error => {
              console.error('Error en la solicitud :', error);
           });
       }
    }
    detail(id?:string){
       if(id!==undefined){
           const dialogRef = this.dialog.open(DetailComponent, {
                width: '720px',
                height: '450px',
                data: {
                  title: 'Detalles',
                  id
                }
          });
          dialogRef.afterClosed().subscribe(response => {
              if(response!==undefined){
                  if(response.error){
                      this.openSnackBar(response.status, 'Cerrar');
                   }
                   this.openSnackBar(response.status, 'Cerrar');
                   this.returnIndex();
              }else{
                //console.log("error: salio del formulario")
              }
          }, error => {
                this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
          });
       }
    }


    returnIndex(){
        /*const parametros: NavigationExtras = {
              queryParams: {
                reload:true,
              }
        };
        this.router.navigate(['/nav/products']);*/
         this.messageService.sendMessage({
              receiver:"index-products"
         });
    }
}

