import { Component, OnInit ,inject} from '@angular/core';
import { FooterComponent } from '../Footer/footer/footer.component';
import { HeaderComponent } from '../Header/header/header.component';
import { ProductSericeService } from '../Service/product-serice.service';
import { PanierServiceService } from '../Service/panier-service.service';
import { DinarPipe } from '../dinar.pipe';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,DinarPipe],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {
  produits: any[] = [];
  total:number=0;

  constructor(private panierService: PanierServiceService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  chargerProduits(): void {
    this.produits = this.panierService.obtenirProduits();
    this.produits.forEach(prod =>{this.total+=prod.price})


  }

  supprimerProduit(index: number): void {
    this.panierService.supprimerProduit(index);
    this.chargerProduits(); 
  }

}
