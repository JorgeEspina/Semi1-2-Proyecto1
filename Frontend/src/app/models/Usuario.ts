export interface Usuario {
  id?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  password?: string;
  passwordconfirmacion?: string;
  foto?: string;
  extension?: string;
  archivospublicos?:number;
}

export interface Amigo {
  id?: number;
  correo?: string;
  idAmigo?: number;
  correoAmigo?: string;
}