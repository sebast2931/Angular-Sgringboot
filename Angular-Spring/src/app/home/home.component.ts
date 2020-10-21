import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Mostrar:boolean = true;

  ListPendientes: String[] = ['Angular', 'Spring', 'Springboot', 'React', 'React Native'];

  Seba: any = "Sebastian Trujillo";

  constructor() { }

  ngOnInit(): void {
  }

  setOcultar(): void {
    this.Mostrar = (this.Mostrar == true)? false:true;

  }

}
