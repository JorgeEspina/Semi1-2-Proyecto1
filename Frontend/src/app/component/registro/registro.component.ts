import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  constructor(private router: Router, private activedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
  Registrarse() {}
  AgregarFoto() {}
  Regresar() {
    this.router.navigate(['']);
  }
}
