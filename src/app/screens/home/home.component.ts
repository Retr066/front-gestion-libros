import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  
})
export class HomeComponent {

  token = localStorage.getItem('JwtToken');

  constructor() { 
    console.log(this.token)
  }

}
