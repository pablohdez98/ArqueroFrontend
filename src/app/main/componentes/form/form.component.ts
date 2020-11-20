import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HomeComponent} from '../../home/home.component';
import {Empleado} from '../../../servicios/http/empleado';
import {HttpService} from '../../../servicios/http/http.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() updateEmpleadoObservable: Observable<Empleado>;
  @Output() cancelFormView = new EventEmitter<boolean>();
  public updateEmpleado: Empleado;
  public empleadoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private http: HttpService,
              private homeComponent: HomeComponent) { }

  ngOnInit(): void {
    this.updateEmpleadoObservable.subscribe(data => {
      this.updateEmpleado = data;
      this.setForm();
    });
    this.setForm();
  }

  private setForm() {
    this.empleadoForm = this.formBuilder.group({
      nombre: [this.updateEmpleado ? this.updateEmpleado.nombre : '', [Validators.required, Validators.minLength(3)]],
      apellido1: [this.updateEmpleado ? this.updateEmpleado.apellido1 : '', [Validators.required, Validators.minLength(3)]],
      apellido2: [this.updateEmpleado ? this.updateEmpleado.apellido2 : '', [Validators.required, Validators.minLength(3)]],
      dni: [this.updateEmpleado ? this.updateEmpleado.dni : '', [Validators.required, this.verifyDNI()]],
      domicilio: [this.updateEmpleado ? this.updateEmpleado.domicilio : '', [Validators.required, Validators.minLength(3)]],
    });
  }

  get FormControl() {
    return this.empleadoForm.controls;
  }
  async onSubmit(form, id?) {
    if (this.empleadoForm.status === 'VALID') {
      if (!this.updateEmpleado) {
        this.homeComponent.anadirEmpleado(form);
      } else {
        this.homeComponent.editarEmpleado(id, form);
      }
    } else {
      this.empleadoForm.markAllAsTouched();
    }
  }

  public cancelForm() {
    this.cancelFormView.emit();
  }

  public verifyDNI(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const alphabet = 'TRWAGMYFPDXBNJZSQVHLCKE';
      const num = Number(control.value.substring(0, 8));
      const letra = control.value.charAt(8);
      let resto = 0;

      resto = num % 23;
      const checkLetra = alphabet.charAt(resto);
      if (letra.toUpperCase() === checkLetra) {
        return null;
      } else {
        return {dni: {value: control.value}};
      }
    };
  }


}
