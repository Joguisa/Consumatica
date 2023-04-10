// import { Paciente } from './paciente';

export interface AsignarTurnos {
  id: number;
  pacienteId: number;
  asignacionTipoServicioId: number;
  paciente: Paciente;
  servicioEmpleado: ServicioEmpleado;
  horaConsulta: Date;
}

export interface Paciente {
  nombres: string;
  apellidos: string;
  cedula: string;
}

export interface ServicioEmpleado {
  empleado: Paciente;
  tipoServicio: TipoServicio;
}

export interface TipoServicio {
  nombreServicio: string;
}
