import { Component,OnInit,Inject,ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';
import {ProductService} from '../../services/product.service'

import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import {getProduct,Product,mod} from '../../interfaces/product.interface'
import {EditComponent} from './dialog/edit/edit.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  providers: [ProductService],
})
export class DetailComponent implements OnInit {

constructor(
    private router: Router,
    private productService:ProductService,
    public dialogRef: MatDialogRef<DetailComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}
  submitted = false;
   public record?: mod[] = []
   dataSource!: MatTableDataSource<mod>;

   displayedColumns: string[] = ['id','tipo','valor','entregado','observacion','cedula','fecha','actions'];
   @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

   ngOnInit(): void {
    this.submitted = false;
    this.productDetail();
  }
  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
   this.productDetail();
  }


  productDetail(){
    this.productService.findOne(this.data.id).subscribe(({ producto }) => {
    	console.log(producto)
    	if(producto.modificaciones.length===0){
    		this.dialogRef.close({
                error:false,
                status:'El producto no posee historial'
              });
    	}
        this.record = producto.modificaciones;
        this.dataSource = new MatTableDataSource(this.record);
        this.dataSource.paginator = this.paginator;
        console.log(this.record)
    }, error => {
        
    });
  }
  

    editar(id?:string){
      if (id !== undefined) {
         const dialogRef = this.dialog.open(EditComponent, {
            width: '400px',
            height: '500px',
            data: {
              title: 'Editar Modificacion',
              id,
              productId:this.data.id
            }
          });
          dialogRef.afterClosed().subscribe(response => {
            //console.log('La respuesta recibida del diálogo es:', respuesta);
              if(response!==undefined){
                  if(response.error){
                      this.openSnackBar(response.status, 'Cerrar');
                  }
                  this.openSnackBar(response.status, 'Cerrar');
              }
          }, error => {
                this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
          });

     }
    }


    eliminar(id?:string){
      if (id !== undefined) {
          this.productService.deleteMod(id).subscribe(response => {
            this.openSnackBar("Modificacion eliminada", 'Cerrar');
            //this.loadUsers();
          }, error => {
            this.openSnackBar("Error eliminando Modificacion", 'Cerrar');
            //this.loadUsers();
            //alert('Error en la solicitud :');
         });
      }
    }





}
