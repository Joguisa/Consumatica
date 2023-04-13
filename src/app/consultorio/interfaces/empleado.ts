export interface Empleado {
  id: number;
  nombres: string;
  apellidos: string;
  cedula: string;
  asignacion?: Asignacion;
  servicio?: Servicio;
}

export interface Asignacion {
  tipoEmpleado: TipoEmpleado;
}

export interface TipoEmpleado {
  nombreTipo: string;
}

export interface Servicio {
  tipoServicio: TipoServicio;
}

export interface TipoServicio {
  nombreServicio: string;
}
