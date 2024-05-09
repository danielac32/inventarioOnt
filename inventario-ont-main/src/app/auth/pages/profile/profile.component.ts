import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,ParamMap ,NavigationExtras} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule/*,FormsModule*/} from '@angular/forms';

import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {User} from '../../interface/auth-login.interface'
import {UpdateUserComponent} from '../../component/update-user/update-user.component'


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule
    ],
  providers: [AuthService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
   constructor(
    private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private _snackBar: MatSnackBar,
      public dialog: MatDialog,
      ) {  }

 person!:User;
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
  }


  ngOnInit(): void {
     this.person = this.authService.getUser()


     this.route.queryParams.subscribe(params => {
       const parametro = params['reload'];
       const status = params['status'];
       if(status){
          this.openSnackBar(params['message'], 'Cerrar');
       }
       if(parametro){
          
       }
    },error=>{
       
    });
  }


  updateUser(id:string){
    if (id !== undefined) {
          const dialogRef = this.dialog.open(UpdateUserComponent, {
              width: '300px',
              height: '400px',
              data: {
                title: 'Editar Usuario',
                id
              }
          });
          dialogRef.afterClosed().subscribe(response => {
            //console.log('La respuesta recibida del diálogo es:', respuesta);
              if(response!==undefined){
                  if(response==true){
                    this.openSnackBar('Usuario editado', 'Cerrar');
                    this.authService.logout();
                  }else{
                    this.openSnackBar('Error editando usuario', 'Cerrar');
                  }
              }
              //this.openSnackBar('Usuario editado', 'Cerrar');
          }, error => {
                this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
          });

      }
  }
}
