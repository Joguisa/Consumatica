export interface Servicio {
  id: number;
  nombreServicio: string;
  asignacionServicio: AsignacionServicio;
}

export interface AsignacionServicio {
  empleado: Empleado;
}

export interface Empleado {
  nombres: string;
  apellidos: string;
  cedula: string;
  asignacion: Asignacion[];
}

export interface Asignacion {
  tipoEmpleado: TipoEmpleado;
}

export interface TipoEmpleado {
  nombreTipo: string;
}
