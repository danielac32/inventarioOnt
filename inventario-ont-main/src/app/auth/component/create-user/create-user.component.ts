
import { Component, OnInit,Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,NavigationExtras } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {User} from '../../interface/auth-login.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatCardModule
    ],
  providers: [AuthService],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit {
constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<CreateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  public myForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rol: ['', Validators.required],
  });
  submitted = false;
  ngOnInit(): void {

    this.submitted = false;
  }

  onSubmit():void{
    this.submitted = true;
      if(!this.myForm.valid) return;
      const { name, email, password,rol} = this.myForm.value;
      this.dialogRef.close({ name, email, password,rol});
  }


}
