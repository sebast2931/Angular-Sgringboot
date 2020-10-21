import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule,registerLocaleData } from '@angular/common';
import  localeES from '@angular/common/locales/es-CO'  

import { AppRoutingModule } from './app-routing.module';

/** RUTAS */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule} from '@angular/common/http';
import { ClientesformComponent } from './clientes/clientesform/clientesform.component'
import { FormsModule } from '@angular/forms';
import { FilterClientesPipe } from './shared/pipes/filter-clientes.pipe';
import { PaginatorComponent } from './paginator/paginator.component'

registerLocaleData(localeES, 'ES-co')// configurar la fecha en español-colombia

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ClientesComponent,
    ClientesformComponent,
    FilterClientesPipe,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'ES-co' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
