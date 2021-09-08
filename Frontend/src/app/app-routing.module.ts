import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { RegistroComponent } from './component/registro/registro.component';
import { PublicComponent } from './component/public/public.component';
import { UploadComponent } from './component/upload/upload.component';
import { DeleteComponent } from './component/delete/delete.component';
import { EditComponent } from './component/edit/edit.component';
import { AddComponent } from './component/add/add.component';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent,
  },
  {
    path: 'Principal',
    component: PrincipalComponent,
  },
  {
    path: 'Registro',
    component: RegistroComponent,
  },
  {
    path: 'Registro/Actualizar/:id',
    component: RegistroComponent,
  },
  {
    path: 'Public',
    component: PublicComponent,
  },
  {
    path: 'Upload',
    component: UploadComponent,
  },
  {
    path: 'Add',
    component: AddComponent,
  },
  {
    path: 'Delete',
    component: DeleteComponent,
  },
  {
    path: 'Edit',
    component: EditComponent,
  },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
