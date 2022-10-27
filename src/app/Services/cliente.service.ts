import { Injectable } from '@angular/core';
import { HttpService} from './http.service'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 token!: string;
  constructor(public http: HttpService) { 

  }

  get(model:string,jwt: string=""){
    debugger
    return this.http.get(jwt,'cliente'+model,true)
  }

  post(model:any,jwt: string=""){
    debugger
    return this.http.post('cliente',model,true,jwt)
  }

  put(model:any,jwt: string=""){
    debugger
    return this.http.put('cliente',model,true,jwt)
  }

  delete(model:any,jwt: string=""){
    debugger
    return this.http.delete(jwt,'cliente'+model,true)
  }
}
