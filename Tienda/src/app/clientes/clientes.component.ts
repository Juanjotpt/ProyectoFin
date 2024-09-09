import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

}
