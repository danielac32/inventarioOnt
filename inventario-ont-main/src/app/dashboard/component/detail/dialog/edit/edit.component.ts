import { Component, OnInit,Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {mod} from '../../../../interfaces/product.interface';

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
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {

constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  submitted = false;


  public modificacion?:mod;

  public myForm: FormGroup = this.fb.group({
    valor: ['', Validators.required],
    entregado: ['', Validators.required],
    observacion: ['', Validators.required],
    cedula: ['', Validators.required],
  });


  ngOnInit(): void {
  	this.submitted = false;
  	//this.myForm.get('categoria')?.setValue(this.data?.name);
  	this.productService.getModProduct(this.data.productId,this.data.id).subscribe(({mod}) => {
        this.modificacion=mod;
	    console.log(mod)
	    this.myForm.get('valor')?.setValue(this.modificacion?.valor);
	    this.myForm.get('entregado')?.setValue(this.modificacion?.entregado);
	    this.myForm.get('observacion')?.setValue(this.modificacion?.observacion);
	    this.myForm.get('cedula')?.setValue(this.modificacion?.cedula);
	}, error => {
	    console.log(error)
	    //this.loadUsers();
	    //alert('Error en la solicitud :');
	});  
  }


  onSubmit(){
       this.submitted = true;
       if(!this.myForm.valid) return;
       const {valor,entregado,observacion,cedula}=this.myForm.value;
       this.productService.updateModProduct(this.data.productId,this.data.id,{valor,entregado,observacion,cedula:Number(cedula)}).subscribe(response => {
            this.dialogRef.close({
                  error:false,
                  status:"Modificacion Editada"
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
