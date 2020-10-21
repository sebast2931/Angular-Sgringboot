import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterClientes'
})
export class FilterClientesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '' || arg > 2){
      return value;
    }

    const filterCliente=[];

    for(const filter of value){
      if( filter.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 || //filtra por nombre
       filter.apellidos.toLowerCase().indexOf(arg.toLowerCase()) > -1 || // filtra por apellido
       filter.email.toLowerCase().indexOf(arg.toLowerCase()) > -1){      // filtra por email
        filterCliente.push(filter)
      }
    }
    return filterCliente;

  }

}
