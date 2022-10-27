import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';



const HOME_ROUTES: Routes = [
  { path: '', component: ClientesComponent},
  { path: 'Home', loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule) },
];
const EC_ROUTES: Routes = [
  { path: ':idModulo', component: ClientesComponent}]

  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(EC_ROUTES)
    ],
    exports: [
      RouterModule 
    ]
  })
export class ClientesRoutingModule { }
