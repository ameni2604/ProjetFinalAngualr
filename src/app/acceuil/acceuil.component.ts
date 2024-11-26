import { Component } from '@angular/core';
import { HeaderComponent } from "../Header/header/header.component";
import { FooterComponent } from "../Footer/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {

}
