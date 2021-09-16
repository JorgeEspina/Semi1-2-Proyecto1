import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario,Amigo } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  ListUsuarios: any = [];
  
  
  usuario: Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    password: '',
    foto: '',
    extension: '',
    archivospublicos:0
  };
  amigo: Amigo = {
    id: 0,
    correo: '',
    idAmigo: 0,
    correoAmigo: '',
  };


  //Codigo tabla
  displayedColumns: string[] = ['foto', 'nombre', 'correo','archivospublicos','Accion'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.ListUsuarios);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private router: Router, private activedRoute: ActivatedRoute,private usuarioService: UsuarioService) {
    this.loadScripts();
  }

  ngOnInit(): void {
    this.getPermiso();
    this.usuarioService.getUsuarios(this.usuario.id).subscribe(
      res => {
        this.ListUsuarios = res;            
        console.log(this.ListUsuarios)
        this.dataSource.data = this.ListUsuarios;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      },
      err => console.log(err)      
    )
    /*this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;*/ 
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
  getPermiso() {
    this.usuario = this.usuarioService.getCurrentUser();
    //console.log(this.usuario);
    if (this.usuarioService.getCurrentUser() == null) {
      console.log('no obtuvo mi locationstorage, no hay nadie logueado ');
    } else {
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
  Agregar(id :number,correo:string ):void {
    //console.log(id)
    //console.log(correo)
    this.amigo.id= this.usuario.id;
    this.amigo.correo = this.usuario.correo;
    this.amigo.idAmigo = id;
    this.amigo.correoAmigo = correo;
    this.usuarioService.AddAmigo(this.amigo).subscribe(
        (res) => {
          //this.usuario = res;
          //console.log(this.retorna_usuario[0]);
          console.log(res);
          alert(
            'Se agrego exitosamente de amigo'
          );
          //this.router.navigate(['/']);
        },
        (err) => {
          //console.log(err)
          alert(
            'Hubo un error al agregar al usuario, vuelva a intentarlo '
          );
      }
      );
  }
}
