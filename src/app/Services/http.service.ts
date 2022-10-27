import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
// import {Usuario,UsRespuesta} from '../interfaces/usuario';
// import {Servicios,SerRespuesta} from '../interfaces/servicios';
// import {Sucursal,ResSucursal} from '../interfaces//surucaral';
// import { DropdownListClass} from '../interfaces/dropdown-list-class';
// import {RespuestaserviciosH} from '../Interfaces/modelo'
import { TokenResponse } from '../Interfaces/token-response';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  urlGetDocumentos!: string;
  TokenGUID!: string;
  UrlApi!: string;
  jwtToken!: string;

  ID_Autorizaciones: number = 1;
  constructor(private http: HttpClient) {
    let apiVentas = sessionStorage.getItem('configVentas')!;
    this.UrlApi = JSON.parse(apiVentas).urlApiVentas;
    this.TokenGUID = JSON.parse(apiVentas).Token;
  }

  /**
   * If the auth parameter is true, then we create a new HttpHeaders object with the Authorization
   * header set to the JWT token. 
   * 
   * If the auth parameter is false, then we don't create the HttpHeaders object. 
   * 
   * In both cases, we return the result of the http.get() function. 
   * 
   * The auth parameter is a boolean value that indicates whether or not we want to send the JWT token
   * to the server. 
   * 
   * If we want to send the JWT token, then we set the auth parameter to true. 
   * 
   * If we don't want to send the JWT token, then we set the auth parameter to false. 
   * 
   * The url parameter is the URL of the web API method that we want to call. 
   * 
   * The jwt parameter is the JWT token. 
   * 
   * The get() function returns an Observable<any> object. 
   * 
   * The Observable
   * @param {string} jwt - The JWT token that you get from the login API.
   * @param {string} url - The URL of the API endpoint you want to call.
   * @param {boolean} auth - boolean - if true, the request will be sent with the authorization header.
   * @returns The http.get method is being returned.
   */
  get(jwt: string, url: string, auth: boolean) {
    debugger;
    if (auth) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + jwt,
      });
      let options = { headers: headers };

      return this.http.get(this.UrlApi + url, options);
    } else {
      return this.http.get(this.UrlApi + url);
    }
  }
  post(url: string, body: any, auth: boolean, token: string = '') {
    if (auth) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      });
      let options = { headers: headers };

      return this.http.post(`${this.UrlApi}${url}`, body, options);
    } else {
      return this.http.post(`${this.UrlApi}${url}`, body);
    }
  }

  put(url: string, body: any, auth: boolean, token: string = '') {
    if (auth) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token,
      });
      let options = { headers: headers };

      return this.http.put(`${this.UrlApi}${url}`, body, options);
    } else {
      return this.http.put(`${this.UrlApi}${url}`, body);
    }
  }

  delete(jwt: string, url: string, auth: boolean) {
    debugger;
    if (auth) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + jwt,
      });
      let options = { headers: headers };

      return this.http.delete(this.UrlApi + url, options);
    } else {
      return this.http.delete(this.UrlApi + url);
    }
  }

  JWTAfil() {
    return new Promise((resolve, reject) => {
      try {
        ////debugger;
        this.http
          .get(this.UrlApi + 'GetToken?token=' + this.TokenGUID)
          .subscribe(
            (res: any) => {
              if (!res.error) {
                resolve(res);
              } else {
                reject(res);
              }
            },
            (exception) => {}
          );
      } catch (ex) {
        reject(ex);
      }
    });
  }
}
