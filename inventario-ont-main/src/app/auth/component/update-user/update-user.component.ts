
import { Component, OnInit,Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {UserUpdate,User} from '../../interface/auth-login.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatCardModule
    ],
  providers: [AuthService],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  

  submitted = false;
  public user?:User;

  public myForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
  });

ngOnInit(): void {

    this.submitted = false;
    this.authService.getUserById(this.data.id)
    .subscribe(({user}) => {
       this.user=user;
       this.myForm.get('name')?.setValue(this.user.name);
       this.myForm.get('email')?.setValue(this.user.email);
       //console.log(this.user)
    }, error => {
       console.error('Error en la solicitud :', error.error);
    });

  }

  onSubmit():void{
    this.submitted = true;
      if(!this.myForm.valid) return;
      //const {name,email,password,rol}=this.myForm.value;
      const formValues = this.myForm.value;
      const dataToSend: { [key: string]: any } = {};

      for (const key in formValues) {
          if (formValues.hasOwnProperty(key) && formValues[key] !== "") {
              dataToSend[key] = formValues[key];
          }
      }
      this.authService.updateUser(this.data.id,dataToSend)
      .subscribe(({updatedUser}) => {
          
         //console.log(updatedUser)
        this.dialogRef.close(true);
      }, error => {
         console.error('Error en la solicitud :', error.error);
         this.dialogRef.close(false);
      });
      //console.log("Datos a enviar:", dataToSend);



  }










}
