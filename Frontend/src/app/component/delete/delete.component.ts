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
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent implements OnInit {
  ListPublicos: any = [];
  data: any = [];
  // para selecion de tipo
  TipoSeleccionado: string = null;
  verSeleccionTipo: string = null;
  //Codigo tabla
  displayedColumns: string[] = ['Nombre', 'Fecha', 'Hora', 'Accion'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.ListPublicos
  );
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router, private activedRoute: ActivatedRoute, private archivoservice: ArchivoService, private usuarioService:UsuarioService) {
    this.loadScripts();
  }
  isLogged: boolean = false;

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
  ngOnInit(): void {
    /*this.productosService.getProductosProveedor(this.usuario._id).subscribe(
      res => {
        //console.log(this.usuario._id)
        this.productos = res.result;             
        console.log(this.productos)
      },
      err => console.log(err)
    )*/
    this.getPermiso();
    this.onCkeckUser();
    //console.log(this.authService.getCurrentUser());
    if (this.usuarioService.getCurrentUser().id == 0) {
      console.log('no logueado usuario');
      this.isLogged = false;
    } else {
      console.log('usuario logueado');
      this.isLogged = true;
      //public
      this.archivoservice.getListPublic(this.usuario.id).subscribe(
        res => {
          this.ListPublicos = res;            
          console.log(this.ListPublicos)
          this.dataSource.data = this.ListPublicos;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        },
        err => console.log(err)      
      )
    }
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
  Buscar() {
    //console.log(new Date("2012-01-17T13:00:00Z"))
    //console.log(this.listadotransacciones)
    /*this.TransaccionesService.ListadoTransaccion(this.listadotransacciones).subscribe(
      res => {
          //console.log(res );
          this.ListTransaccion = res;
          this.auxiliar('Se hizo reporte de Transacciones '+this.listadotransacciones.fecha_inicio+" a "+this.listadotransacciones.fecha_fin);
          this.dataSource.data = this.ListTransaccion;
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
          //console.log(this.ListTransaccion);                 
       },
      err => console.log(err)
    )*/
  }
  onCkeckUser(): void {
    if (this.usuarioService.getCurrentUser() == null) {
      console.log('no logueado usuario');
      this.isLogged = false;
    } else {
      this.usuario = this.usuarioService.getCurrentUser();
      console.log('usuario logueado 1');
      console.log(this.usuario);
      this.isLogged = true;
    }
  }
  getPermiso() {
    this.usuario = this.usuarioService.getCurrentUser();
    console.log(this.usuario);
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
  Delete() {
    if (this.usuario.password == '' ) {
      alert('Ingrese la contraseña ');
    } else {
      console.log(this.usuario);
      this.usuarioService.VerificacionSesion(this.usuario).subscribe(
        (res) => {
          //this.usuario = res;
          console.log(res)
          this.archivoservice.DeteleDetalleArchivo(this.archivo).subscribe(
            (res) => {
              console.log(res);
              this.archivoservice.DeleteArchivo(this.archivo).subscribe(
                (res) =>{
                  console.log("Se elimino todo");
                }
              )
              /*this.archivoservice.getListArchivo(this.usuario.id).subscribe(
                res => {
                  this.ListPublicos = res;             
                  console.log(this.ListPublicos)
                  this.dataSource.data = this.ListPublicos;
                  setTimeout(() => {
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                  });
                },
                err => console.log(err)
              )*/
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
