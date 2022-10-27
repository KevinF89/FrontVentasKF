import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { FormsModule,ReactiveFormsModule   } from '@angular/forms';



@NgModule({
  declarations: [
    ClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    FormsModule,ReactiveFormsModule 
  ]
})
export class ClientesModule { }
