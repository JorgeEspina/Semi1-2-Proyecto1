import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    foto: '',
    extension: '',
    passwordconfirmacion: '',
  };
  usuario2: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    foto: '',
    extension: '',
    passwordconfirmacion: '',
  };
  constructor(
    private router: Router,private activedRoute: ActivatedRoute,private usuarioService: UsuarioService
  ) {}
  modificar: boolean = false;
  isLogged: boolean = false;
  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.id) {
      this.usuario2 = this.usuarioService.getCurrentUser();
      console.log(this.usuario2.id);
      console.log(params.id);
      if (params.id == this.usuario2.id) {
        console.log('bien');
        this.modificar = true;
        this.isLogged = true;
        this.usuario = this.usuarioService.getCurrentUser();
        /*this.usuarioService.getUsuario(this.usuario.id).subscribe(
          res => {       
            this.usuario = res;
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )*/
      } else {
        console.log(params.id);
      }
    }
  }

 
  Registrarse():void {  
      if (this.usuario.password !== this.usuario.passwordconfirmacion) {
        alert('Las contraseñas no coinciden');
      } else {
        if (!this.modificar) {
          this.usuarioService.CreateUsuario(this.usuario).subscribe(
            (res) => {
              this.usuario = res;
              //console.log(this.retorna_usuario[0]);
              console.log(res);
              this.router.navigate(['/']);
            },
            (err) => {
              //console.log(err)
              alert(
                'Usuario ya existe.! o hubo un error en los datos, vuelva a intentarlo '
              );
            }
          );
        } else {
          /*this.servicioUsuarios.updateUsuario(this.usuario).subscribe(data => {
          this.auxiliar('Se modificado un usuario ')
          alert('Se ha modificado el usuario existosamente');
          this.router.navigate(['/Usuarios']);
        }, error => {
          alert('Ha existido un error al modificar el usuario');
        });*/
        }
      }
    }

  private ext: string = '';
  private base64textString: String = '';

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      var parts = file.name.split('.');
      console.log(parts[1]);
      this.ext = parts[1];
      console.log(file.name);
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.usuario);
    //this.usuario =  this.usuarioService.getCurrentUser();
    //console.log('data:image/'+this.ext+';base64,'+btoa(binaryString));
    this.usuario.extension = this.ext;
    this.usuario.foto =
      /*
      'data:image/' + this.ext + ';base64,' +*/ btoa(binaryString);
    /*this.usuarioService.GuardarFotoCliente(this.usuario).subscribe(
      res => {
          console.log(res );
          console.log('actuaqlizo foto obtiene datos')
          this.usuarioService.ObtenerDatosUsuario(this.activedRoute.snapshot.params.id).subscribe(
            res => {       
              //this.usuario = res;

              this.usuario = res;
              delete this.usuario.ingresos;
              delete this.usuario.ventas;
              this.usuario.tipo = 'cliente'
              this.usuarioService.setUser(this.usuario);
              alert("Se actualizo la foto de perfil");
              //console.log(this.retorna_usuario[0]);
              console.log(res)
            },
            err => {
              console.log(err)
            }
          )
        },
      err => {
        console.log(err)
        alert("Hubo un error al guardar foto, vuelva a intentarlo");
      }
    )*/
  }
  Regresar() {
    this.router.navigate(['']);
  }
}
