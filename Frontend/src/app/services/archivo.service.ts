import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../../assets/env';
import { Archivo,DetalleArchivo } from '../models/Archivo';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private http: HttpClient) {}

  // Subir archivo 
  SubirArchivo(archivo: Archivo): Observable<Archivo> {
    return this.http.post(getUrl() + 'subirArchivo', archivo);
  }
  
  // Detalle archivo 
 SaveDetalleArchivo(detallearchivo: DetalleArchivo,idarchivo:number): Observable<DetalleArchivo> {
     detallearchivo.Archivo_idArchivo = idarchivo;
     //console.log(detallearchivo)
     return this.http.post(getUrl() + 'detalleArchivo', detallearchivo);
  }

   // obtener archivos publicos 
   getListPublic(id:number): Observable<any>{
    return this.http.get(getUrl() + 'listpublic?id='+id);
  }
  
   // obtener archivos privados 
   getListPrivate(id:number): Observable<any>{
    return this.http.get(getUrl() + 'listprivate?id='+id);
  }
   // obtener archivos publicos de amigos 
   getListPublicFriends(id:number): Observable<any>{
    return this.http.get(getUrl() + 'listpublicfriends?id='+id);
  }
  
  
}
