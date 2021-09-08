import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    fotobase64: '',
    extension: '',
  };
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  InicioSesion() {
    this.usuarioService.VerificacionSesion(this.usuario).subscribe(
      (res) => {
        this.usuario = res;
        console.log(this.usuario);

        this.router.navigate(['/Principal']);
        this.usuarioService.setUser(this.usuario);
      },
      (err) => {
        //console.log(err)
        alert('Usuario no existe.!, vuelva a intentarlo');
      }
    );
  }

  Registro() {
    this.router.navigate(['/Registro']);
  }
}
