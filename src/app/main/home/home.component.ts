import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../servicios/http/http.service'
import {Empleado} from '../../servicios/http/empleado';
import {BehaviorSubject} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public empleados: Empleado[];
  public formEmpleado = false;
  public empleadoToUpdate: BehaviorSubject<Empleado>;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getEmpleados();
    this.empleadoToUpdate = new BehaviorSubject<Empleado>(null);
  }

  public hideForm() {
    this.formEmpleado = false;
  }

  public formCreateEmpleado() {
    this.empleadoToUpdate.next(null);
    this.formEmpleado = true;
  }

  public setEmpleadoToUpdate(empleado) {
    this.empleadoToUpdate.next(empleado);
    this.formEmpleado = true;
  }

  // Llamadas al servicio
  public getEmpleados(id = '') {
    this.http.get('empleado/' + id).subscribe(data => {
      this.empleados = data.empleados;
    },
      () => {
        Swal.fire({
          title: 'Error',
          text: 'No se han podido cargar los empleados',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
        });
      });
  }

  public anadirEmpleado(empl: Empleado) {
    this.http.post('empleado/', empl).subscribe(() => {
      this.getEmpleados();
      this.hideForm();
      Swal.fire({
        title: 'Empleado creado',
        text: 'El empleado se ha creado correctamente',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      });
    },
      error => {
        Swal.fire({
          title: 'Error',
          text: 'El empleado no se ha podido crear',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
        });
      });
  }

  public eliminarEmpleado(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.http.delete('empleado/' + id).subscribe(() => {
          this.empleados = this.empleados.filter(empleado => empleado.id !== id);
          Swal.fire({
            title: 'Empleado borrado',
            text: 'El empleado se ha borrado correctamente',
            icon: 'success',
            timer: 2000,
            timerProgressBar: true,
          });
        });
      }
    });
  }

  public editarEmpleado(id, empl: Empleado) {
    this.http.put('empleado/' + id, empl).subscribe(() => {
      this.getEmpleados();
      this.hideForm();
      Swal.fire({
        title: 'Empleado actualizado',
        text: 'El empleado se ha actualizado correctamente',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
      });
    },
      () => {
        Swal.fire({
          title: 'Error',
          text: 'El empleado no se ha podido actualizar',
          icon: 'error',
          timer: 3000,
          timerProgressBar: true,
        });
      });
  }
}
