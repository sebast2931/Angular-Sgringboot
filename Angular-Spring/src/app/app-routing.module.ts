import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesformComponent } from './clientes/clientesform/clientesform.component';





const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'home', component: HomeComponent},
  {path:'clientes',component: ClientesComponent},
  {path:'clientes/page/:page',component: ClientesComponent},
  {path:'navbar', component: NavbarComponent},
  {path: 'clientes-form', component: ClientesformComponent},
  {path: 'clientes-form/:id', component: ClientesformComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
