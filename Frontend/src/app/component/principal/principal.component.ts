import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  constructor() {
    this.loadScripts();
  }

  ngOnInit(): void {
    /*this.productosService.getProductosProveedor(this.usuario._id).subscribe(
      res => {
        //console.log(this.usuario._id)
        this.productos = res.result;             
        console.log(this.productos)
      },
      err => console.log(err)
    )*/
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
