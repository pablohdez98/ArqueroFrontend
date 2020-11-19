import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../servicios/http/http.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  private getEmpleados() {
    console.log('Obtiene los datos de los empleados');
  }

  public anadirEmpleado() {
    console.log('Añadir empleado');
  }

  public eliminarEmpleado(empleado: any) {
    console.log('Eliminar empleado');
  }

  public editarEmpleado() {
    console.log('Editar empleado');
  }


}
