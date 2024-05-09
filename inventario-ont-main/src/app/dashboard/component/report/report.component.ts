import { Component , OnInit,Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router ,NavigationExtras} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {ProductService} from '../../services/product.service'
import {getProduct} from '../../interfaces/product.interface'

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
  	RouterLink,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
  providers: [ProductService,]
})
export class ReportComponent implements OnInit {
public myForm: FormGroup = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
});

//startTime?: string; // Aquí almacenarías el valor de inicio de tu formulario
//endTime?: string; // Aquí almacenarías el valor de inicio de tu formulario
submitted=false;
lista: getProduct[]=[];

 constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        public dialogRef: MatDialogRef<ReportComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        ) {}

  ngOnInit(): void {
      this.submitted=false;
  }

 createReport(){
 	this.submitted=true;
    if(!this.myForm.valid) return;	
    const{startDate,endDate}=this.myForm.value;
    if(startDate>endDate){
    	this.dialogRef.close({
          error:true,
          status:"la fecha de inicio es mayor a la fecha final"
      });
    }
    this.productService.getProducts(startDate,endDate).subscribe(({producto}) => {
      console.log("aqui: ",producto[1].modificaciones)
      
     

     // this.productService.generarExcel(, `desde(${startDate}) hasta(${endDate})`);
    }, error => {
      console.error('Error en la solicitud :', error);
    });

 }

}

