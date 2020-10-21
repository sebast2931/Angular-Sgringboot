import { Component, OnInit } from '@angular/core';
import { Clientes } from '../shared/models/clientes.model';
import { ClientesService } from '../shared/services/clientes/clientes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
ActivatedRoute


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  // cliente: Clientes[] =[
  //   // {id:'1',Nombre:'Sebastian',Apellidos:'Trujillo',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'2',Nombre:'Ernesto',Apellidos:'Ramirez',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'3',Nombre:'Duvan',Apellidos:'Tamayo',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'4',Nombre:'Javier',Apellidos:'Gomez',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'5',Nombre:'Pablo',Apellidos:'Monroy',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'6',Nombre:'Martin',Apellidos:'Londoño',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'7',Nombre:'Andres',Apellidos:'Ospina',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'8',Nombre:'Santiago',Apellidos:'Jaramillo',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'9',Nombre:'ivan',Apellidos:'Mora',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'10',Nombre:'Yeison',Apellidos:'Rosas',Telefono:'2132344', Email:'s@gmail.com'},
  // ];

  clientes: Clientes[];
  filterPost ='';

  constructor(private clientesService: ClientesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let page = 1
    this.getClient(); 
    // 
  }

  getClient(){
    this.activatedRoute.paramMap.subscribe( params =>{
      let page: number = +params.get('page'); // se coloca el + para poder castear a numero
      if(!params){
        page = 0;
      }
      this.clientesService.getClientes(page).subscribe((data) => {
          this.clientes = data;        
      });
    });
  }

  delete(cliente: Clientes){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas Seguro?',
      text: `Quieres Eliminar ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado!',
          `tu registro ${cliente.nombre} hasido eliminado.`,
          'success'
        )
        //funcion eliminar
        this.clientesService.deleteCliente(cliente.id).subscribe(promise =>{
          this.clientes = this.clientes.filter(cli => cli  !== cliente)
        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El registro no se elimino',
          'error'
        )
      }
    })
  }


    /*********************************
     * crear un vector con dos objetos
     * 
     * 
     * *****************************
     * this.ArrayCount = data.count;
     * this.ArrayName = data.name;
    
    /**crea un vector con objetos para descargar la información en excel */
    /*  for(var i = 0; i < this.ArrayName.length; i++){

      this.arrayFinal.push({
        Nombre: this.ArrayName[i],
        Cantidad: this.ArrayCount[i]
      })        
    }
    /******************
     * otra manera de crearlo
      const res = Object.keys(response).map((item, i) => {
      return {
      name: item,
      value: Object.values(response)[i]
      }
      })
      ***
   
    */

}
