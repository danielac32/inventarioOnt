import { Component, OnInit ,OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from '../product-card/product-card.component';

import { ActivatedRoute,Router } from '@angular/router';
import { RouterLink,NavigationExtras } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import {ProductService} from '../../services/product.service'
import {productResponse,Product}from '../../interfaces/product.interface'
import {MessageService} from '../../services/subjectService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-index-product',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    ProductCardComponent,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule
  ],
  providers: [ProductService],
  templateUrl: './index-product.component.html',
  styleUrl: './index-product.component.css'
})

export class IndexProductComponent implements OnInit {
  public limit: number = 5;
  public limitOptions: number[] = [5, 10, 15, 25, 50];
  public page: number = 1;
  public total?:number;
  public metaPage?: number;
  public metaLastPage?: number;
  
  public productos: Product[] = [];
  private subscription: Subscription;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private messageService: MessageService
  ) {
    this.subscription = this.messageService.message$.subscribe(message => {
        if(message.receiver==='index-products'){
           this.limit=5;
           this.page=1;
           this.loadProducts();
           console.log("reload")
        }
    });

      
  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
  }

loadProducts(): void {
  this.productService.findAll(this.limit, this.page).subscribe(({ producto, meta }) => {
    this.productos = producto;
    if (meta) {
      this.metaLastPage = meta.lastPage;
      this.page = meta.page;
      this.total = meta.total;

      console.log("limit: ",this.limit)
      console.log("page: ",this.page)
      console.log("last page: ",this.metaLastPage)
      console.log("total: ",this.total)

    }else{
      console.log("no hay meta")
    }
  });
}
  

  ngOnDestroy() {
   this.subscription.unsubscribe();
     
  }

  ngOnInit(): void {
    /*this.route.queryParams.subscribe(params => {
       const parametro = params['reload'];
       const status = params['status'];

       if(status){
          this.openSnackBar(params['message'], 'Cerrar');
       }
       if(parametro){
          this.limit=5;
          this.page=1;
          this.loadProducts();
       }
    },error=>{

    });*/
    this.limit=5;
    this.page=1;
    this.loadProducts();
  }

  backProducts() {
    if(this.page <= 1) return;
    this.page--;
    this.loadProducts()
  }
  
  otherProducts() {
    if(this.page == this.metaLastPage) return;
    this.page++
    this.loadProducts();
  }

  changeLimit(event: any) {
    const value = event.target.value;
    this.limit = +value;
    this.loadProducts();
    // this.limit = value;
  }
  searchProduct(){

  }

}
