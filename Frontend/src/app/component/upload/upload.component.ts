import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo,DetalleArchivo } from '../../models/Archivo';
import { ArchivoService } from '../../services/archivo.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  ListPublicos: any = [];
  data: any = [];
  // para selecion de tipo
  TipoSeleccionado: string = null;
  verSeleccionTipo: string = null;

  archivo: Archivo = {
    idArchivo: 0,
    nombre: '',
    tipo: '',
    path: '',
    extension: '',
    archivo:''
  };

  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    foto: '',
    extension: '',
    passwordconfirmacion: '',
  };
  detallearchivo: DetalleArchivo = {
    idDetalleArchivo: 0,
    Archivo_idArchivo: 0,
    Usuario_idUsuario: 0,
    Usuario_correo: ''
  };

  constructor(private router: Router, private activedRoute: ActivatedRoute,private archivoservice: ArchivoService, private usuarioService: UsuarioService) {
    this.loadScripts();
  }

  ngOnInit(): void {
    this.usuario = this.usuarioService.getCurrentUser();
  }
  loadScripts() {
    const dynamicScripts = ['../../../assets/js/script.js'];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  capturarTipo() {
    this.verSeleccionTipo = this.TipoSeleccionado;
    console.log(this.verSeleccionTipo);
    if(this.verSeleccionTipo == "Todas los Tipos"){
      this.archivo.tipo = '';
    }else if(this.verSeleccionTipo == "Publico"){
      this.archivo.tipo = '0';
    }else if(this.verSeleccionTipo == "Privado"){
      this.archivo.tipo = '1';
    }
  }
  SelecionarArchivo() {}
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
      this.archivo.nombre = parts[0];
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.archivo);
    //this.usuario =  this.usuarioService.getCurrentUser();
    //console.log('data:image/'+this.ext+';base64,'+btoa(binaryString));
    this.archivo.extension = this.ext;
    this.archivo.archivo =
      /*
      'data:image/' + this.ext + ';base64,' +*/ btoa(binaryString);
   
  }
  Cargar():void {
    console.log(this.usuario)
    if (this.usuario.password == '' ) {
      alert('Ingrese la contraseña ');
    } else {
      this.usuarioService.VerificacionSesion(this.usuario).subscribe(
        (res) => {
          this.usuario = res;
          //console.log(res)
          this.detallearchivo.Usuario_correo = this.usuario.correo;
          this.detallearchivo.Usuario_idUsuario = this.usuario.id;
          this.archivoservice.SubirArchivo(this.archivo).subscribe(
            (res) => {
              this.detallearchivo.Archivo_idArchivo = res.idArchivo;
              //console.log(this.detallearchivo);
                           
              //this.detallearchivo.Archivo_idArchivo = res.idArchivo
             
              this.archivoservice.SaveDetalleArchivo(this.detallearchivo,res.idArchivo).subscribe(
                (res) => {
                  console.log(res);                  
                },
                (err) => {
                  console.log(err)
                  alert(
                    'Hubo un error en guardar relacion del archivo, vuelva a intentarlo '
                  );
                }
              );         
            },
            (err) => {
              console.log(err)
              alert(
                'Hubo un error en subir el archivo, vuelva a intentarlo '
              );
            }
          );          
        },
        (err) => {
          //console.log(err)
          alert(
            'Hubo un error en los datos, vuelva a intentarlo '
          );
        }
      );     
    }    
  }
  Regresar():void  {
    this.router.navigate(['/Principal']);
  }
}
