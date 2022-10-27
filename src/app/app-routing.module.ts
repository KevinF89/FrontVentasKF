import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './Modules/home/home/home.component';
import {ClientesComponent} from './Modules/clientes/clientes/clientes.component';

const routes: Routes = 
[
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'clientes', component:ClientesComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }