import { Component,OnInit,Inject,ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';
import {CategoryService} from '../../services/category.service'
import {category } from '../../interfaces/category.interface'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import {EditComponent} from './dialog/edit/edit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
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
  providers: [CategoryService],

  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}
  submitted = false;
  public categorias?: category[] = []
  dataSource!: MatTableDataSource<category>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
    this.loadCategory();
  }


  ngOnInit(): void {
    this.submitted = false;
    this.loadCategory();
  }
  public myForm: FormGroup = this.fb.group({
    categoria: ['', Validators.required],
  });


  loadCategory():void{
    this.categoryService.findAll().subscribe(({ categoria }) => {
        this.categorias = categoria
        this.dataSource = new MatTableDataSource(this.categorias);
        this.dataSource.paginator = this.paginator;
        console.log(this.categorias)
    }, error => {
        
    });
  }

  edit(id:string,name:string){
     if (id !== undefined) {
         const dialogRef = this.dialog.open(EditComponent, {
            width: '300px',
            height: '230px',
            data: {
              title: 'Editar categoria',
              id,
              name
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
  delete(id:string){
     if (id !== undefined) {
        this.categoryService.remove(id).subscribe(response => {
            this.openSnackBar("Categoria eliminada", 'Cerrar');
            //this.loadUsers();
         }, error => {
            this.openSnackBar("Error eliminando categoria", 'Cerrar');
            //this.loadUsers();
            //alert('Error en la solicitud :');
         });
     }
  }
  

  onSubmit(){
       this.submitted = true;
       if(!this.myForm.valid) return;

       const {categoria} = this.myForm.value;

       this.categoryService.create({name:categoria}).subscribe(response => {
            console.log(response)
            this.myForm.get('categoria')?.setValue('');
            this.submitted = false;
            //this.loadCategory();
            this.openSnackBar('Categoria creada', 'Cerrar');
        }, error => {
            console.log(error)
       });

       //const { descripcion, stock, codigo, categoria} = this.myForm.value;
       //const user = this.authService.getUser();
       //this.dialogRef.close({ descripcion, stock, codigo, categoriaId:Number(categoria),userId:Number(user.id)});
  }

}
