import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comercial',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comercial.component.html',
  styleUrl: './comercial.component.css'
})
export class ComercialComponent {

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
}
