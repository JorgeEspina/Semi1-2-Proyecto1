import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private router: Router, private activedRoute: ActivatedRoute) {
    this.loadScripts();
  }

  ngOnInit(): void {}
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
    /*if(this.verSeleccionTipo == "Todas los Tipos"){
      this.usuario.tipo = '';
    }else if(this.verSeleccionTipo == "Publico"){
      this.usuario.tipo = 'Publico';
    }else if(this.verSeleccionTipo == "Privado"){
      this.usuario.tipo = 'Privado';
    }*/
  }
  SelecionarArchivo() {}
  Cargar() {}
  Regresar() {
    this.router.navigate(['/Principal']);
  }
}
