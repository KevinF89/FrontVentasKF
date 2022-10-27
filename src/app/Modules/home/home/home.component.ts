import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../Services/producto.service';
import { HttpService } from '../../../Services/http.service';
import { Producto } from 'src/app/Interfaces/producto';
import { AlertaService } from 'src/app/Services/alerta.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public resta: Array<Producto> = [];
  public productoEditar: Producto | undefined;
  public productoCrear: Producto | undefined;
  private router!: Router;
  private activatedRoute!: ActivatedRoute;

  eljwt!: string;
  validacion!: string;

  formUpdateProducto!: FormGroup;
  formCreateProducto!: FormGroup;

  constructor(
    public alertaService: AlertaService,
    public productoService: ProductoService,
    public httpService: HttpService,
    private formBuilder: FormBuilder
  ) {
    debugger;

    this.ConsultarProductos();
  }
  ngOnInit(): void {
    this.formUpdateProducto = this.formBuilder.group({
      txtid: ['', [Validators.required, Validators.nullValidator]],
      txtNombre: ['', [Validators.required, Validators.nullValidator]],
      txtDescripcion: ['', [Validators.required, Validators.nullValidator]],
      txtValor: ['', [Validators.required, Validators.nullValidator]],
      txtCantidad: ['', [Validators.required, Validators.nullValidator]],
    });

    this.formCreateProducto = this.formBuilder.group({
      txtNombre: ['', [Validators.required, Validators.nullValidator]],
      txtDescripcion: ['', [Validators.required, Validators.nullValidator]],
      txtValor: ['', [Validators.required, Validators.nullValidator]],
      txtCantidad: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  ConsultarProductos() {
    try {
      this.httpService.JWTAfil().then(
        (res: any) => {
          this.eljwt = res.token;

          let model = '';
          this.productoService.get(model, this.eljwt).subscribe((res: any) => {
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

  public seleccionar(T: Producto) {
    this.productoEditar = T;

    // this.formUpdateProducto.controls['ddlEmpelado'].setValue(
    //   this.productoEditar.productoID
    // );
    // this.formupdateProducto.controls['dtfecha'].setValue(
    //   this.productoEditar.FechaProyectada
    // );
  }

  public borrar(T: Producto) {
    //this.SpinnerService.show();
    try {
      this.httpService.JWTAfil().then((res: any) => {
        this.eljwt = res.token;

        //let model = '';
        let model = '?productoId='+ T.productoID ;
        this.productoService.delete(model, this.eljwt).subscribe(
          (res: any) => {
            debugger;
            if (res.data) {
              this.productoEditar = {
                productoID: 0,
                nombre: '',
                valor: 0,
                descripcion: '',
                cantidadDisponible: 0,
              };
              this.alertaService.success(
                'Se ha eliminado la tarea exitosamente',
                true,
                3000
              );
              this.ConsultarProductos();
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

  public CrearProducto(T: FormGroup) {
    debugger;
    //this.SpinnerService.show();
    try {
      debugger;
      this.validacion = '';
      if (this.formCreateProducto.invalid) {
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

        this.productoCrear!.nombre = this.formCreateProducto.get('txtNombre')?.value;
        this.productoCrear!.valor = this.formCreateProducto.get('txtValor')?.value;
        this.productoCrear!.cantidadDisponible = this.formCreateProducto.get('txtCantidad')?.value;
        this.productoCrear!.descripcion = this.formCreateProducto.get('txtDescripcion')?.value;


        //this.SpinnerService.show();
        this.productoService.post(this.productoCrear, this.eljwt).subscribe(
          (res: any) => {
            debugger;

            if (res.data) {
              this.productoCrear = undefined;
              this.alertaService.success(
                'Se ha creado el producto exitosamente',
                true,
                3000
              );
              this.ConsultarProductos();
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
  
  public ActualizarProducto(T:FormGroup) {
    //this.SpinnerService.show();
    try {
      debugger;

      this.validacion="";
   if(this.formUpdateProducto.invalid)
   {
     this.alertaService.error('Debe diligenciar todos los campos',true,3000)
	 this.validacion="Debe diligenciar todos los campos";
	 return;
   }
      this.httpService.JWTAfil().then((res: any) => {
        this.eljwt = res.token;

        this.productoEditar!.productoID = this.formUpdateProducto.get('txtid')?.value;
        this.productoEditar!.nombre = this.formUpdateProducto.get('txtNombre')?.value;
        this.productoEditar!.valor = this.formUpdateProducto.get('txtValor')?.value;
        this.productoEditar!.cantidadDisponible = this.formUpdateProducto.get('txtCantidad')?.value;
        this.productoEditar!.descripcion = this.formUpdateProducto.get('txtDescripcion')?.value;


        //this.SpinnerService.show();
        this.productoService.put(this.productoEditar, this.eljwt).subscribe(
          (res: any) => {
            debugger;

            if (res.data) {
              this.productoEditar = undefined;
              this.alertaService.success(
                'Se ha creado el producto exitosamente',
                true,
                3000
              );
              this.ConsultarProductos();
            }
            //this.SpinnerService.hide();
          },
          (rej) => {
            console.log(rej);
            //this.SpinnerService.hide();
          }
        );
      });
        }
        catch (error) {
          console.log(error);
      
          //this.SpinnerService.hide();
          }
  }


public limpiarEdicion(){
  this.productoEditar = undefined;
}

IrAModulo(id: number, ruta: string) {

  this.router.navigate([ruta, id], { skipLocationChange: true });
}

}