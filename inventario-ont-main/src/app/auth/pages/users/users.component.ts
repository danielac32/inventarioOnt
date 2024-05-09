import { Component, OnInit ,ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Router ,NavigationExtras} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {User,UserResponse} from '../../interface/auth-login.interface'
import {CreateUserComponent} from '../../component/create-user/create-user.component'
import {EditUserComponent} from '../../component/edit-user/edit-user.component'



@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    HttpClientModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
    ],
  providers: [AuthService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
public users: User[] = [];
dataSource!: MatTableDataSource<User>;
displayedColumns: string[] = ['name', 'email','rol' ,'isActive', 'actions'];
@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
selectedValue: any;

constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {

}
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000, // Duración en milisegundos
      verticalPosition: 'top', // Posición vertical de la alerta
      horizontalPosition: 'end', // Posición horizontal de la alerta
      panelClass: ['green']
    });
    this.loadUsers();
  }
  
  ngOnInit(): void {

    /*this.route.queryParams.subscribe(params => {
       const parametro = params['reload'];
       const status = params['status'];
       if(status){
          this.openSnackBar(params['message'], 'Cerrar');
       }
       if(parametro){
         this.loadUsers();
       }
    },error=>{
       //this.loadUsers();
    });*/
    
    this.loadUsers();

}

  loadUsers():void{
    this.authService.allUser().subscribe(({users}) => {
        this.users = users
       // console.log("aquii: ",this.users[0].direction?.address )
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
     }, error => {
        console.error('Error en la solicitud :', error);
        /*this.handleMessage('/nav/users',{
           status: 'error',
           message: 'Error cargando los usuarios',
           reload:true
        });*/
        this.openSnackBar("Error en la solicitud", 'Cerrar');
        //this.router.navigate(['/nav']);
        this.authService.logout();
     });
  }

  createUser():void{
       const dialogRef = this.dialog.open(CreateUserComponent, {
            width: '300px',
            height: '400px',
            data: {
              title: 'Crear Usuario'
            }
        });
        dialogRef.afterClosed().subscribe(response => {
          //console.log('La respuesta recibida del diálogo es:', respuesta);
            if(response!==undefined){
                this.authService.createUser(response)
                .subscribe(esponse => {
                  this.openSnackBar('Usuario Creado', 'Cerrar');
                  //this.loadUsers();
                }, error => {
                   console.error('Error en la solicitud :', error.error);
                   this.openSnackBar(error.error, 'Cerrar');
                  //this.loadUsers();
                });
            }
        }, error => {
              this.openSnackBar('error recibiendo la respuesta del dialog', 'Cerrar');
              //this.loadUsers();
        });


  }


 
  editar(id?:string){

      if (id !== undefined) {
          const dialogRef = this.dialog.open(EditUserComponent, {
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


  eliminar(id?:string){
      if (id !== undefined) {
          this.authService.deleteUser(id).subscribe(response => {
              console.log("usuario eliminado ")
              this.openSnackBar("Usuario eliminado", 'Cerrar');
              //this.loadUsers();
           }, error => {
              console.error('Error en la solicitud :', error);
              this.openSnackBar("Error eliminando usuario", 'Cerrar');
              //this.loadUsers();
              //alert('Error en la solicitud :');
           });
      }
    }

  resetPass(id?:string){
    if (id !== undefined) {
           this.authService.updateUser(id,{password:"123456"}).subscribe(response => {
              console.log("clave cambiada ")
              this.openSnackBar("Clave cambiada", 'Cerrar');
              //this.loadUsers();
           }, error => {
              console.error('Error en la solicitud :', error);
              this.openSnackBar("Error cambiando contraseña", 'Cerrar');
              //this.loadUsers();
              //alert('Error en la solicitud :');
           });
    }
  }

activar(id?: string) {
    if (id !== undefined) {
         this.authService.updateUser(id,{isActive:true}).subscribe(response => {
 
              this.openSnackBar("Usuario activado", 'Cerrar');
              //this.loadUsers();
           }, error => {
              console.error('Error en la solicitud :', error);
              this.openSnackBar("Error cambiando contraseña", 'Cerrar');
              //this.loadUsers();
              //alert('Error en la solicitud :');
           });
    }
  }
desactivar(id?: string) {
    if (id !== undefined) {
          this.authService.updateUser(id,{isActive:false}).subscribe(response => {
              this.openSnackBar("Usuario desactivado", 'Cerrar');
           }, error => {
              console.error('Error en la solicitud :', error);
              this.openSnackBar("Error cambiando contraseña", 'Cerrar');
              //this.loadUsers();
              //alert('Error en la solicitud :');
           });
    }
  }






}
