import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule, APP_INITIALIZER,LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SharedModule } from './Modules/shared/shared.module';
import { HomeModule } from './Modules/home/home.module';
import { registerLocaleData } from '@angular/common';
import { Config } from 'src/app/Interfaces/config';
import { NgxSpinnerModule } from "ngx-spinner";

  export function iniciar(http: HttpClient): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>( (resolve: (a: boolean) => void): void => {
      let config: Config = {};
      
      const jsonFile = 'assets/config/config.json';
      http.get(jsonFile).subscribe((ConfigJson: Config ={}) =>{
        config.urlApiVentas = ConfigJson.urlApiVentas;                             
        config.UrlAppVentas = ConfigJson.UrlAppVentas; 
        config.Token = ConfigJson.Token;


        sessionStorage.setItem('configVentas',JSON.stringify(config));
           resolve(true);
        });
      });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule ,
    AppRoutingModule,
    HttpClientModule,NgxSpinnerModule,
    SharedModule,
    HomeModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: iniciar,
      deps: [
        HttpClient
      ],
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'es-ES' },
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
