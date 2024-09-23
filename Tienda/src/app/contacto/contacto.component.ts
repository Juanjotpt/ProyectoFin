import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  constructor(private location: Location){}
  
goBack(){
  this.location.back();
}


}
