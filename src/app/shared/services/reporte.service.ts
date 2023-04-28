import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset = UTF-8';
const  EXCEL_EXT = '.xlsx';

@Injectable()
// @Injectable({
//   providedIn: 'root',
// })
export class ReporteService {

  private currentDate = new Date().toLocaleDateString('es-ES');

  constructor() { }

  exportToExcel(json: any[], excelFileName: string): void{
    
      const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook : XLSX.WorkBook = { Sheets: {'data': worksheet},
      SheetNames : ['data']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //llamar al método, pasarle lo que tengamos guardado en el buffer y su nombre
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer:any, fileName: string): void {
      const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      // FileSaver.saveAs(data, fileName + 'Lista de empleados' + new Date().getTime() + EXCEL_EXT); //Muestra el nombre del archivo más los milisegundos
      // const fileNameWithoutTimestamp = fileName.replace(/\.[^/.]+$/, ''); // Eliminar extensión del tiempo para mostrar solo el nombre del archivo
      // FileSaver.saveAs(data, fileNameWithoutTimestamp + EXCEL_EXT); // se muestra solo el nombre que definí en el TS
      FileSaver.saveAs(data, fileName + ' ' + this.currentDate + EXCEL_EXT); //Muestra el nombre del archivo que definí en el TS y la fecha actual
  }
}
