import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Archivo,DetalleArchivo } from '../../models/Archivo';
import { ArchivoService } from '../../services/archivo.service';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  List: any = [];
  data: any = [];
  // para selecion de tipo
  TipoSeleccionado: string = null;
  verSeleccionTipo: string = null;
  //Codigo tabla
  displayedColumns: string[] = ['nombre', 'extension','tipo','Accion'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.List);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    foto: '',
    extension: '',
    passwordconfirmacion: '',
  };
  archivo: Archivo = {
    idArchivo: 0,
    nombre: '',
    tipo: '',
    path: '',
    extension: '',
    archivo:''
  };

  constructor(private router: Router, private activedRoute: ActivatedRoute , private archivoservice: ArchivoService, private usuarioService:UsuarioService) {
    this.loadScripts();
  }
  isLogged: boolean = false;

  ngOnInit(): void {
    this.getPermiso();
    this.onCkeckUser();
    this.archivoservice.getListArchivo(this.usuario.id).subscribe(
      res => {
        this.List = res;             
        //console.log(this.List)
        this.dataSource.data = this.List;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      err => console.log(err)
    )
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
  onCkeckUser(): void {
    if (this.usuarioService.getCurrentUser() == null) {
      console.log('no logueado usuario');
      this.isLogged = false;
    } else {
      this.usuario = this.usuarioService.getCurrentUser();
      console.log('usuario logueado 1');
      //console.log(this.usuario);
      this.isLogged = true;
    }
  }
  getPermiso() {
    this.usuario = this.usuarioService.getCurrentUser();
    //console.log(this.usuario);
    if (this.usuarioService.getCurrentUser() == null) {
      console.log('no obtuvo mi locationstorage, no hay nadie logueado ');
    } else {
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
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Update() {
    if (this.usuario.password == '' || typeof this.usuario.password =='undefined' ) {
      alert('Ingrese la contraseña ');
    } else {
      console.log(this.usuario);
      this.usuarioService.VerificacionSesion(this.usuario).subscribe(
        (res) => {
          //this.usuario = res;
          console.log(res)
          this.archivoservice.updateArchivo(this.archivo).subscribe(
            (res) => {
              console.log(res);
              this.archivoservice.getListArchivo(this.usuario.id).subscribe(
                res => {
                  this.List = res;             
                  console.log(this.List)
                  this.dataSource.data = this.List;
                  setTimeout(() => {
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                  });
                  alert('Se Actualizo el registro exitosamente');
                },
                err => console.log(err)
              )
            },
            (err) => {
              console.log(err)
              alert(
                'Hubo un error en modificar el archivo, vuelva a intentarlo '
              );
            }
          );          
        },
        (err) => {
          console.log(err)
          alert(
            'Hubo un error en el password Incorrecto, vuelva a intentarlo '
          );
        }
      );     
    }    
  }
 
  Regresar() {
    this.router.navigate(['/Principal']);
  }
  Ver(id:number,nombre:string ,tipo:string):void {
    /*console.log(nombre);
    console.log(tipo);
    console.log(id);*/
    this.archivo.idArchivo = id;
    this.archivo.nombre = nombre;
    this.archivo.tipo = tipo;
  }
}
