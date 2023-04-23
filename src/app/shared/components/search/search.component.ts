import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  // @Output() filterValue = new EventEmitter<Event>();
  // @Output() filterValue = new EventEmitter<string>();
  // @ViewChild('input') input: any;
  // applyFilter(event: Event) {
  //   const value = (event.target as HTMLInputElement).value;
  //   this.filterValue.emit(value);
  // }
  // @ViewChild('input', { static: true }) input:
  //   | ElementRef<HTMLInputElement>
  //   | undefined;
  // filterValue: string | undefined;
  // ngOnInit() {
  //   this.input.nativeElement.addEventListener('keyup', (event: Event) => {
  //     this.filterValue = (event.target as HTMLInputElement).value;
  //     this.aplicarFiltroTabla();
  //   });
  // }
  // aplicarFiltroTabla() {
  //   // Llamar al método del componente hijo con el valor del filtro
  //   this.searchComponent.aplicarFiltroTabla(this.filterValue);
  // }
}
