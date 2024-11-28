import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../Header/header/header.component';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { RouterLink } from '@angular/router';
import { ProductSericeService } from '../../Service/product-serice.service';
import { Product } from '../../Class/prouduct';
import { DinarPipe } from '../../dinar.pipe';
import { PanierServiceService } from '../../Service/panier-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ring',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterLink,DinarPipe,NgClass],
  templateUrl: './ring.component.html',
  styleUrl: './ring.component.css'
})
export class RingComponent {
  products:Product[]=[];
  searchName:string='';
  filteredProducts:Product[]=[];
  constructor(private panierService: PanierServiceService) {}


  private readonly productservice:ProductSericeService=inject(ProductSericeService);
  ngOnInit(): void {
    this.productservice.getProduts("Earrings").subscribe(data => {this.products=data
      this.filteredProducts = data;
    
    }
    );
    
  }
  ajouterAuPanier(produit: any): void {
    this.panierService.ajouterProduit(produit);
    alert(`${produit.name} a été ajouté au panier.`);
  }
 
}
