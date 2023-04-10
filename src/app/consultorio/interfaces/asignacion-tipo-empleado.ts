export interface AsignacionTipoEmpleado {
  id: number;
  empleadoId: number;
  tipoEmpleadoId: number;
  empleado: Empleado;
  tipoEmpleado: TipoEmpleado;
}

export interface Empleado {
  nombres: string;
  apellidos: string;
  cedula: string;
}

export interface TipoEmpleado {
  nombreTipo: string;
}
