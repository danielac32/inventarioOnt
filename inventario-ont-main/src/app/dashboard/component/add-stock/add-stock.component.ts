import { Component ,Inject} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ProductService} from '../../services/product.service'
//import {ProductUpdate} from '../../interfaces/product.interface'
import {ProductEnum} from '../../interfaces/product.enum';


@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers:[ProductService],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.css'
})
export class AddStockComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<AddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public productService:ProductService,
  ) {}
  submitted = false;

  public myForm: FormGroup = this.fb.group({
    cantidad: ['', Validators.required],
  });

  onSubmit(){
       this.submitted = true;
       if(!this.myForm.valid) return;
       const {cantidad}=this.myForm.value;

       if(Math.sign(cantidad)<0){
          this.dialogRef.close({
            error:true,
            status:"la cantidad es negativa"
          });
       }else{
           this.productService.updateStockAdd(this.data.id,{
                                                              stock:Number(cantidad),
                                                              tipo:ProductEnum.add,
                                                              valor:Number(cantidad),
                                                              entregado:ProductEnum.self
                                                            }).subscribe(response => {
              console.log("producto actualizado ",response)
              this.dialogRef.close({
                  error:false,
                  status:"producto actualizado"
              });
           }, error => {
              console.error('Error en la solicitud :', error);
              this.dialogRef.close({
                error:true,
                status:error.error.message
              });
           });
           return;
       }


       /**/
       /*this.productService.update(data.id,{}).subscribe(response => {
              console.log("producto eliminado ")
               
           }, error => {
              console.error('Error en la solicitud :', error);
           });*/

  }












}
