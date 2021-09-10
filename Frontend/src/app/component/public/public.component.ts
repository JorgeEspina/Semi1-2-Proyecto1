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
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit {
  ListPublicos: any = [];
  data: any = [];

  //Codigo tabla public
  displayedColumns: string[] = ['usuario','nombre', 'extension','Accion'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.ListPublicos);
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
    this.archivoservice.getListPublicFriends(this.usuario.id).subscribe(
      res => {
        console.log(this.usuario.id)
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
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Regresar() {
    this.router.navigate(['/Principal']);
  }
  Ver(url:string ):void {
    console.log(url);
    window.open(url, "_blank");
  }
}
