import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { RegistroComponent } from './component/registro/registro.component';
import { NavegacionComponent } from './component/navegacion/navegacion.component';

// Tabla dinamica 
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

import { PublicComponent } from './component/public/public.component';
import { UploadComponent } from './component/upload/upload.component';
import { DeleteComponent } from './component/delete/delete.component';
import { EditComponent } from './component/edit/edit.component';
import { AddComponent } from './component/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    RegistroComponent,
    NavegacionComponent,
    PublicComponent,
    UploadComponent,
    DeleteComponent,
    EditComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
