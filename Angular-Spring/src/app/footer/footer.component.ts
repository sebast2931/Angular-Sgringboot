import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  Autor: any = {Nombre: "Sebastian", Apellido: "Trujillo"}

  constructor() { }

  ngOnInit(): void {
  }

}
