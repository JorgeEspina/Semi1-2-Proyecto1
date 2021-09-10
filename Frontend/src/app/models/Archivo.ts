export interface Archivo {
    idArchivo?: number;
    nombre?: string;
    tipo?: string;
    path?: string;
    extension?: string;
    archivo?:string;
  }
  export interface DetalleArchivo {
    idDetalleArchivo?: number;
    Archivo_idArchivo?: number;
    Usuario_idUsuario?: number;
    Usuario_correo?: string;
  }