import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertaComponent } from './alerta/alerta.component';


@NgModule({
declarations: [ AlertaComponent],
 // declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [AlertaComponent]
  //exports: [ ]
})
export class SharedModule { }
