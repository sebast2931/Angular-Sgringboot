import { Injectable } from '@angular/core';
import { Clientes } from '../../models/clientes.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  // clientes: Clientes[] =[
  //   {id:'1',Nombre:'Sebastian',Apellidos:'Trujillo',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'2',Nombre:'Ernesto',Apellidos:'Ramirez',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'3',Nombre:'Duvan',Apellidos:'Tamayo',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'4',Nombre:'Javier',Apellidos:'Gomez',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'5',Nombre:'Pablo',Apellidos:'Monroy',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'6',Nombre:'Martin',Apellidos:'Londoño',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'7',Nombre:'Andres',Apellidos:'Ospina',Telefono:'2132344', Email:'s@gmail.com'},
  //   {id:'8',Nombre:'Santiago',Apellidos:'Jaramillo',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'9',Nombre:'ivan',Apellidos:'Mora',Telefono:'2132344', Email:'s@gmail.com'},
  //   // {id:'10',Nombre:'Yeison',Apellidos:'Rosas',Telefono:'2132344', Email:'s@gmail.com'},
  // ];

  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  private urlEndpoint: string = "http://localhost:8080/api/clientes"
  
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Listado de clientes por paginacion
   */
  getClientes(page: number): Observable<any>{   
    // return of(this.clientes);
    return this.http.get(this.urlEndpoint+ "/page/"+ page).pipe(
      map((response: any) => response.content as Clientes[])
    )
  }
  
  /**
   * Listado total de Clientes
   */
  getClientesList(): Observable<Clientes[]>{   
    // return of(this.clientes);
    return this.http.get<Clientes[]>(this.urlEndpoint).pipe(
      map( response => {
        response.map( cliente => {
          cliente.nombre = cliente.nombre.toLocaleUpperCase()

           /*************** APELLIDOS **********************************************************************************
           * otra menera y es mejor es hacerlo desde el html 
           * {‌{ cliente.apellidos | uppercase }} como esta en el apellido desde el html 
           * 
           * *************************************************************************
           * otra manera
           * cliente.apellidos = cliente.apellidos.toLocaleUpperCase() -> si quiero el apellido tambien en mayuscula
           * 
           * **********************************************************************************************************/
         

           /**************** FORMATO FECHA **********************************************************************************
           * 
           * {datos.create_at | date:'dd/MM/yyyy hh:mm:ss'} 
           * otra forma de colcar formato diferente de la fecha
           * 
           * ***********************************************************************************************************
           * let datePipe = new DatePipe('en-US')
           * cliente.create_at = datePipe.transform(cliente.create_at, 'dd-MM-yyyy') otra forma de convertir la fecha
           * 
           * ************************************************************************************************************
           * otra manera de formatear la fecha
           * cliente.create_at = formatDate(cliente.create_at, 'EEEE dd, MMMM yyyy', 'ES-co')// otra forma de convertir la fecha
           * 
           * ***********************************************************************************************************/
       })
        return response
      
     })
    )
  }

  createClientes(cliente: Clientes): Observable<any>{

    return this.http.post<any>(this.urlEndpoint,cliente,{headers: this.httpHeader}).pipe(// se puede de esta manera o como esta en el update
      catchError( e =>{ // se captura el error desde el back para mostrarlo en el front

        if(e.status==400){
          return throwError(e);
        }
        // this.router.navigate(['/clientes']);
        swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Clientes>{
    return this.http.get<Clientes>(`${this.urlEndpoint}/${id}`).pipe(
      catchError( e =>{ // se captura el error desde el back para mostrarlo en el front
        this.router.navigate(['/clientes']);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateCliente(cliente: Clientes): Observable<Clientes>{    
    return this.http.put(`${this.urlEndpoint}/${cliente.id}`, cliente,{headers: this.httpHeader}).pipe(
      map((response: any) => response.cliente as Clientes),// se puede hacer esta manera para convertir el observable en el cliente
      catchError( e =>{ // se captura el error desde el back para mostrarlo en el front
        if(e.status==400){
          return throwError(e);
        }
        this.router.navigate(['/clientes']);
        swal.fire('Error al actualizar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  deleteCliente(id): Observable<Clientes>{
    return this.http.delete<Clientes>(`${this.urlEndpoint}/${id}`,{headers: this.httpHeader}).pipe(
      catchError( e =>{ // se captura el error desde el back para mostrarlo en el front
        this.router.navigate(['/clientes']);
        swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

}
