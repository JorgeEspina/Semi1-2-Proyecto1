import { Injectable } from '@angular/core';
import { Usuario,Amigo } from './../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getUrl } from '../../assets/env';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    foto: '',
    extension: '',
    password: '',
  };
  constructor(private http: HttpClient) {}
  //LocalStore
  setUser(usuario: Usuario): void {
    let user_string = JSON.stringify(usuario);
    //console.log(user_string);
    localStorage.setItem('UsuarioActual', user_string);
  }

  getUser() {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser() {
    let user_string = localStorage.getItem('UsuarioActual');
    if (user_string != null) {
      this.usuario = JSON.parse(user_string);
      //console.log(this.usuario+'ya dentro')
      return this.usuario;
    } else {
      return this.usuario;
    }
  }

  logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('UsuarioActual');
    localStorage.removeItem('OrdenActual');
  }

  // verifico sesion
  VerificacionSesion(usuario1: Usuario): Observable<Usuario> {
    //console.log()
    console.log(usuario1);
    return this.http.post(getUrl() + 'login', usuario1);
  }
  // registro
  CreateUsuario(usuario1: Usuario): Observable<Usuario> {
    //console.log(getUrl() + 'signup');
    //console.log(usuario1);
    return this.http.post(getUrl() + 'signup', usuario1);
  }
  // Modificar un usuario
  UpdateUsuario(usuario1: Usuario): Observable<Usuario> {
    //delete usuario.password;
    return this.http.put(getUrl() + 'update', usuario1);
  }
  // obtener dotos los usuarios 
  getUsuarios(id:number): Observable<any>{
    return this.http.get(getUrl() + 'listausuarios?id='+id);
  }
  
  // Add amigo en mi lista
  AddAmigo(amigo: Amigo): Observable<Usuario> {
    return this.http.post(getUrl() + 'agregarAmigo', amigo);
  }
}
