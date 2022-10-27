import { Component } from '@angular/core';
import { HomeComponent } from './Modules/home/home/home.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontVentasKF';
  nombreModulo: string[] = [];
  rutaRegresar : string = "";


}
