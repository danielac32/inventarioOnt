import { Component,OnInit,Inject,ViewChild } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';
import {CategoryService} from '../../../../services/category.service'
import {category } from '../../../../interfaces/category.interface'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit',
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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<EditComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}
  submitted = false;

  dataSource!: MatTableDataSource<category>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  
  ngOnInit(): void {
  	this.myForm.get('categoria')?.setValue(this.data?.name);
    this.submitted = false;
  }
  public myForm: FormGroup = this.fb.group({
    categoria: ['', Validators.required],
  });

  onSubmit(){
       this.submitted = true;
       if(!this.myForm.valid) return;
       const {categoria} = this.myForm.value;

       this.categoryService.update(this.data.id,{name:categoria}).subscribe(response => {
            this.dialogRef.close({
                  error:false,
                  status:"Categoria Editada"
            });
       }, error => {
       		console.log(error)
       		this.dialogRef.close({
              error:true,
              status:error.error.message
            });
       });
   }
 
}
