import { Injectable } from '@angular/core';
import { HttpService} from './http.service'

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  token!: string;
  constructor(public http: HttpService) { 

  }

  get(model:string,jwt: string=""){
    debugger
    return this.http.get(jwt,'producto'+model,true)
  }

  post(model:any,jwt: string=""){
    debugger
    return this.http.post('producto',model,true,jwt)
  }

  put(model:any,jwt: string=""){
    debugger
    return this.http.put('producto',model,true,jwt)
  }

  delete(model:any,jwt: string=""){
    debugger
    return this.http.delete(jwt,'producto'+model,true)
  }
}
