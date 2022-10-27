
import { Injectable } from '@angular/core';
import { HttpService} from './http.service'

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
 token!: string;
  constructor(public http: HttpService) { 

  }

  get(model:string){
    debugger
    return this.http.get('','tipoDocumento'+model,false)
  }

}
