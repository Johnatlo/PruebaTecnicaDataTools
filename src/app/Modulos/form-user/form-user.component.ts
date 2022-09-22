import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usuario } from 'src/app/Interfaces/usuario';
import { UsersService } from 'src/app/Servicios/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  createForm:FormGroup;
  empleado:usuario;
  bandera:boolean = false;

  constructor(private service: UsersService) { }

  ngOnInit(): void {

    this.formControl();

  }
  get error(): any { return this.createForm.controls; }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de crear los controles del formulario
   */

  formControl(): void {

    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3) ]),
      lastName: new FormControl('', [Validators.minLength(3)]),
      documentNumber: new FormControl('', [Validators.required,  Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email ]),
      age: new FormControl('', [Validators.min(0), Validators.max(100)]),
      hobbie: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required])

    });

  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de crear y guardar los usuarios en el local storage
   * @param createForm datos del formulario resueltos desde el html
  */
  saveForm(createForm: any): void {

    this.empleado = {name: createForm.value.name,
    lastName: createForm.value.lastName,
    gender: createForm.value.gender,
    email: createForm.value.email,
    documentNumber: createForm.value.documentNumber,
    age: createForm.value.age,
    hobbie:createForm.value.hobbie}

    if(this.service.saveUser(this.empleado)){
      Swal.fire({
        icon: 'success',
        text: 'Usuario guardado correctamente!!'
      })
    };
    this.createForm.reset();

  }

  /**
   * @autor Jhonathan lopez
   * Metodo que se encarga de esconder el placeholder de edad cuando el usuario es femenino
    * @param event envento de cambio de select
  */
  onChange(event): void{

    if(event === 'Masculino'){
      this.bandera = true;
    } else {
      this.bandera = false;
    }

  }

  }
