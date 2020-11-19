import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../servicios/http/http.service'
import {Empleado} from '../../servicios/http/empleado';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public empleados: Empleado[];
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getEmpleados();
  }

  private getEmpleados(id = '') {
    this.http.get('empleado/' + id).subscribe(data => {
      this.empleados = data.empleados;
    });
  }

  public anadirEmpleado(empl: Empleado) {
    this.http.post('empleado/', empl).subscribe(data => console.log(data));
  }

  public eliminarEmpleado(id) {
    this.http.delete('empleado/' + id).subscribe();
  }

  public editarEmpleado(id, empl: Empleado) {
    this.http.put('empleado/' + id, empl).subscribe(data => console.log(data));
  }
}
