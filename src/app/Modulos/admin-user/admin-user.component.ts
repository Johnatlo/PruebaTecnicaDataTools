import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from 'src/app/Servicios/users.service';
import { FormUserComponent } from '../form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'genero', 'edad', 'hobbie'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

/**
   * @autor Jhonathan lopez
   * Metodo que se encarga de traer la lista de usuarios
   */

  getUsers(){
    this.dataSource.data = this.service.getUser();
  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de abrir el modal del formulario
   */
  abrirModal(): void{

      const dialogRef = this.dialog.open(FormUserComponent,{
        width: '60%',
        data: {
          type: 'crear',
          title: 'Crear'
        },
        panelClass: 'custom-dialog-container',
      });

      dialogRef.afterClosed().subscribe(result => {
        this.getUsers();
      });

  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de borrar los usuarios en el localstorage
   */

  borrar(){
    if(this.service.deleteUser()){
      Swal.fire({
        icon: 'success',
        text: 'Usuario eliminado los usuarios con exito!!'
      })
    };
    this.getUsers();
  }


}
