import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { usuario } from '../Interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
   * @autor Jhonathan lopez
   * Servicio que se encarga de guardar los usuarios en el localstorage
   * @param user usuario de tipo usuario 
   * @returns true
   */
  saveUser(user: usuario): boolean{

    let empleados:usuario[] = [];

    empleados = JSON.parse(localStorage.getItem('Users')) ?? [];
    empleados.push(user);

    localStorage.setItem('Users', JSON.stringify(empleados));

    return true;
  }

   /**
   * @autor Jhonathan lopez
   * Servicio que se encarga de retornar los usuarios guardados en el localstorage
   * @returns usuarios lista de usuarios
   */
  getUser(): usuario[]{

    let usuarios : usuario[];

    let users = JSON.parse(localStorage.getItem('Users'));

    usuarios = users;

    return usuarios;
  }

   /**
   * @autor Jhonathan lopez
   * Servicio que se encarga de limpiar el localstorage
   * * @returns true para indicar que ya se limpio el localstorage
   */

  deleteUser():boolean{

    localStorage.clear();

    return true;

  }
}
