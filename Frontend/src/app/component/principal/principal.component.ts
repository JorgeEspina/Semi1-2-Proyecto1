import { Component, ViewChild, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  ListPublicos: any = [];
  data: any = [];

  //Codigo tabla
  displayedColumns: string[] = ['Nombre', 'Fecha', 'Hora', 'Accion'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.ListPublicos
  );
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    fotobase64: '',
    extension: '',
    passwordconfirmacion: '',
  };
  constructor(
    private router: Router,
    private activedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.loadScripts();
  }
  isLogged: boolean = false;

  ngOnInit(): void {
    this.getPermiso();
    this.onCkeckUser();
    //console.log(this.authService.getCurrentUser());
    if (this.usuarioService.getCurrentUser().id == 0) {
      console.log('no logueado usuario');
      this.isLogged = false;
    } else {
      console.log('usuario logueado');
      this.isLogged = true;
    }
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
  onLogout(): void {
    this.usuarioService.logoutUser();
    this.router.navigate(['/']);
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    this.router.navigate(['/Add']);
  }
  upload() {
    this.router.navigate(['/Upload']);
  }
  edit() {
    this.router.navigate(['/Edit']);
  }
  delete() {
    this.router.navigate(['/Delete']);
  }
  public() {
    this.router.navigate(['/Public']);
  }

  Principal() {
    this.redirectTo('');
    window.location.reload();
  }
  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
}
