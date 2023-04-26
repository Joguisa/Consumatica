import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { TipoEmpleado } from 'src/app/consultorio/tipo-empleado/interfaces/tipo-empleado';
import { SelectorOption } from '../models/selector-option.model';
import { SelectorChange } from '../models/selecto-change.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;

  @Input() ngmodel!: NgModel;
  @Input() opciones: SelectorOption<any>[] = [];
  @Input() valorSeleccionado!: number;
  @Output() valorSeleccionadoChange = new EventEmitter<
    SelectorChange<number>
  >(); // pendiente con el number, sino funciona lo cambio a string

  constructor() {}

  ngOnInit() {}

  displayErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
