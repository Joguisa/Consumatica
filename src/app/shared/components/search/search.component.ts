import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() filtro!: string;
  @Output() filtroCambiado = new EventEmitter<string>();

  aplicarFiltro(evento: Event) {
    const valor = (evento.target as HTMLInputElement).value;
    this.filtro = valor;
    this.filtroCambiado.emit(this.filtro);
  }
  
  
}
