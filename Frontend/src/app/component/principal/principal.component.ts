import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Archivo,DetalleArchivo } from '../../models/Archivo';
import { ArchivoService } from '../../services/archivo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent implements OnInit {
  ListPublicos: any = [];
  ListPrivate: any = [];
  data: any = [];

 //Codigo tabla public
 displayedColumns: string[] = ['nombre', 'extension','Accion'];
 dataSource: MatTableDataSource<any> = new MatTableDataSource(this.ListPublicos);

 //Codigo tabla private
 displayedColumns1: string[] = ['nombre', 'extension','Accion'];
 dataSource1: MatTableDataSource<any> = new MatTableDataSource(this.ListPrivate);

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

  constructor(private router: Router,private activedRoute: ActivatedRoute,private usuarioService: UsuarioService,private archivoservice: ArchivoService) {
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
      //private
      this.archivoservice.getListPrivate(this.usuario.id).subscribe(
        res => {
          this.ListPrivate = res;            
          console.log(this.ListPrivate)
          this.dataSource1.data = this.ListPrivate;
          setTimeout(() => {
            this.dataSource1.paginator = this.paginator;
            this.dataSource1.sort = this.sort;
          });
        },
        err => console.log(err)      
      )
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
    this.router.navigate(['/Login']);
    this.usuarioService.logoutUser();
  }
  Perfil():void{
    this.router.navigate(['/Registro/Actualizar/'+this.usuario.id]);
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyFilter1(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
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
    //window.location.reload();
  }
  redirectTo(uri: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }
  Ver(url:string ):void {
    console.log(url);
    window.open(url, "_blank");
  }
}
