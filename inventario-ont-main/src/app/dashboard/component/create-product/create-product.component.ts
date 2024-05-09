import { Component,OnInit,Inject } from '@angular/core';
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
import {AuthService} from '../../../auth/services/auth.service'

import {MessageService} from '../../services/subjectService';
import {ProductEnum} from '../../interfaces/product.enum';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatCardModule
  ],
  providers: [CategoryService,AuthService],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    public authService:AuthService,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private messageService: MessageService
  ) {}

  public categorias?: category[] = []
  submitted = false;

  public myForm: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    stock: ['', Validators.required],
    codigo: ['', Validators.required],
    categoria: ['', Validators.required],
  });
  
  ngOnInit(): void {
    this.submitted = false;
    this.categoryService.findAll().subscribe(({ categoria }) => {
        this.categorias = categoria
        //console.log(this.categorias)
    }, error => {
        
    });

  }


  onSubmit(){
       this.submitted = true;
       if(!this.myForm.valid) return;
       const { descripcion, stock, codigo, categoria} = this.myForm.value;
       const user = this.authService.getUser();
       this.dialogRef.close({ tipo:ProductEnum.create,
                              valor:stock,
                              entregado:ProductEnum.self,
                              descripcion, 
                              stock, 
                              codigo, 
                              categoriaId:Number(categoria),
                              userId:Number(user.id)
                            });
       //this.messageService.sendMessage({
       //       receiver:"index-products"
      // });
  }
}
