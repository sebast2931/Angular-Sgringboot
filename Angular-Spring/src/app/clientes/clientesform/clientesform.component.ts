import { Component, OnInit } from '@angular/core';
import { Clientes } from '../../shared/models/clientes.model';
import { ClientesService } from '../../shared/services/clientes/clientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';




@Component({
  selector: 'app-clientesform',
  templateUrl: './clientesform.component.html',
  styleUrls: ['./clientesform.component.css']
})
export class ClientesformComponent implements OnInit {

  cliente: Clientes = new Clientes();
  errores: String[];

  constructor(private clientesService: ClientesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCliente();
  }

  loadCliente():void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id'];
      if(id){
        this.clientesService.getCliente(id).subscribe((cliente)=>{
          this.cliente = cliente;
        })
      }
    })
  }

  create(){
    this.clientesService.createClientes(this.cliente)
    .subscribe(
      response =>{
        swal.fire('Nuevo Cliente',
                  `Cliente ${response.cliente.nombre} ${response.mensaje}`,
                  "success")
        this.router.navigate(['/clientes'])

      },
      err =>{
        this.errores = err.error.erros        
      } 
    );  
  }

   update(){   
    this.clientesService.updateCliente(this.cliente)
    .subscribe(
      response =>{ 
        swal.fire('Cliente Actualizado',
                      `Cliente ${this.cliente.nombre} se ha Actualizado con exito`,
                      "success")
        this.router.navigate(['/clientes'])
    
      },
      err =>{
        this.errores = err.error.errores
      } 
    )
  }
}
