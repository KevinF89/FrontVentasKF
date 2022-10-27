import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../../Services/cliente.service';
import { TipoDocumentoService } from '../../../Services/tipo-documento.service';
import { HttpService } from '../../../Services/http.service';
import { Cliente } from 'src/app/Interfaces/cliente';
import { Tiposdocumento } from 'src/app/Interfaces/tiposdocumento';
import { AlertaService } from 'src/app/Services/alerta.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public resta: Array<Cliente> = [];
  public clienteEditar: Cliente | undefined;
  public clienteCrear: Cliente = {
    clienteID:  0,
    nombres: "",
    apellidos:"",
    tipoDocumentoID: 0,
    documento:"",
    celular:"",
    correo:"",
  };
  private router!: Router;
  private activatedRoute!: ActivatedRoute;

  eljwt!: string;
  validacion!: string;

  formUpdateCliente!: FormGroup;
  formCreateCliente!: FormGroup;
  ListDocumentos:Array<Tiposdocumento>=[];
  constructor(
    public alertaService: AlertaService,
    public clienteService: ClienteService,
    public tipoDocumentoService:TipoDocumentoService,
    public httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    debugger;
this.ConsultarDocumentos();
    this.ConsultarClientes();
  }

  ngOnInit(): void {
    this.formUpdateCliente = this.formBuilder.group({
      txtid: ['', [Validators.required, Validators.nullValidator]],
      txtNombres: ['', [Validators.required, Validators.nullValidator]],
      txtApellidos: ['', [Validators.required, Validators.nullValidator]],
      ddlDocumentos:['',[Validators.required,Validators.nullValidator]],
      txtDocumento: ['', [Validators.required, Validators.nullValidator]],
      txtCelular: ['', [Validators.required, Validators.nullValidator]],
      txtCorreo: ['', [Validators.required, Validators.nullValidator]],
    });

    this.formCreateCliente = this.formBuilder.group({
      txtNombres: ['', [Validators.required, Validators.nullValidator]],
      txtApellidos: ['', [Validators.required, Validators.nullValidator]],
      ddlDocumentos:['',[Validators.required,Validators.nullValidator]],
      txtDocumento: ['', [Validators.required, Validators.nullValidator]],
      txtCelular: ['', [Validators.required, Validators.nullValidator]],
      txtCorreo: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  ConsultarClientes() {
    try {
      this.httpService.JWTAfil().then(
        (res: any) => {
          this.eljwt = res.token;

          let model = '';
          this.clienteService.get(model, this.eljwt).subscribe((res: any) => {
            debugger;
            this.resta = res.data;
          });
        },
        (rej) => {
          console.log(rej);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  ConsultarDocumentos() {
    try {

          let model = '';
          this.tipoDocumentoService.get(model).subscribe((res: any) => {
            debugger;
            this.ListDocumentos = res.data;
          });

    } catch (error) {
      console.log(error);
    }
  }

  public seleccionar(T: Cliente) {
    this.clienteEditar = T;

  }

  public borrar(T: Cliente) {
    //this.SpinnerService.show();
    try {
      this.httpService.JWTAfil().then((res: any) => {
        this.eljwt = res.token;

        //let model = '';
        let model = '?clienteId='+ T.clienteID ;
        this.clienteService.delete(model, this.eljwt).subscribe(
          (res: any) => {
            debugger;
            if (res.data) {
              this.clienteEditar =undefined;
              this.alertaService.success(
                'Se ha eliminado la tarea exitosamente',
                true,
                3000
              );
              this.ConsultarClientes();
            }
            //this.SpinnerService.hide();
          },
          (rej) => {
            console.log(rej);
            //this.SpinnerService.hide();
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  public CrearCliente(T: FormGroup) {
    debugger;
    //this.SpinnerService.show();
    try {
      debugger;
      this.validacion = '';
      if (this.formCreateCliente.invalid) {
        this.alertaService.error(
          'Debe diligenciar todos los campos',
          true,
          3000
        );
        this.validacion = 'Debe diligenciar todos los campos';
        return;
      }
      this.httpService.JWTAfil().then((res: any) => {
        this.eljwt = res.token;

        this.clienteCrear!.nombres = this.formCreateCliente.get('txtNombres')?.value;
        this.clienteCrear!.apellidos = this.formCreateCliente.get('txtApellidos')?.value;
        this.clienteCrear!.documento = this.formCreateCliente.get('txtDocumento')?.value;
        this.clienteCrear!.celular = this.formCreateCliente.get('txtCelular')?.value;
        this.clienteCrear!.correo = this.formCreateCliente.get('txtCorreo')?.value;
        this.clienteCrear!.tipoDocumentoID = +this.formCreateCliente.get('ddlDocumentos')?.value;


        //this.SpinnerService.show();
        this.clienteService.post(this.clienteCrear, this.eljwt).subscribe(
          (res: any) => {
            debugger;

            if (res.data) {
              //this.clienteCrear = "";
              this.alertaService.success(
                'Se ha creado el cliente exitosamente',
                true,
                3000
              );
              this.ConsultarClientes();
            }
            //this.SpinnerService.hide();
          },
          (rej) => {
            console.log(rej);
            //this.SpinnerService.hide();
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  public ActualizarCliente(T:FormGroup) {
    try {
      this.validacion="";
   if(this.formUpdateCliente.invalid)
   {
     this.alertaService.error('Debe diligenciar todos los campos',true,3000)
	 this.validacion="Debe diligenciar todos los campos";
	 return;
   }
      this.httpService.JWTAfil().then((res: any) => {
        this.eljwt = res.token;

        this.clienteEditar!.clienteID = this.formUpdateCliente.get('txtid')?.value;
        this.clienteEditar!.apellidos = this.formUpdateCliente.get('txtApellidos')?.value;
        this.clienteEditar!.documento = this.formUpdateCliente.get('txtDocumento')?.value;
        this.clienteEditar!.celular = this.formUpdateCliente.get('txtCelular')?.value;
        this.clienteEditar!.correo = this.formUpdateCliente.get('txtCorreo')?.value;
        this.clienteEditar!.tipoDocumentoID = +this.formUpdateCliente.get('ddlDocumentos')?.value;

        this.clienteService.put(this.clienteEditar, this.eljwt).subscribe(
          (res: any) => {
            debugger;

            if (res.data) {
              this.clienteEditar = undefined;
              this.alertaService.success(
                'Se ha creado el cliente exitosamente',
                true,
                3000
              );
              this.ConsultarClientes();
            }
          },
          (rej) => {
            console.log(rej);
          }
        );
      });
        }
        catch (error) {
          console.log(error);
          }
  }


public limpiarEdicion(){
  this.clienteEditar = undefined;
}

}