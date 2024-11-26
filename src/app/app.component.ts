import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcceuilComponent } from "./acceuil/acceuil.component";
import { HeaderComponent } from './Header/header/header.component';
import { FooterComponent } from './Footer/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet';
}
