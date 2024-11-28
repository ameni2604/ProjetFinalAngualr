import { Component, inject } from '@angular/core';
import { Product } from '../../Class/prouduct';
import { ProductSericeService } from '../../Service/product-serice.service';
import { HeaderComponent } from "../../Header/header/header.component";
import { FooterComponent } from "../../Footer/footer/footer.component";
import { RouterLink } from '@angular/router';
import { DinarPipe } from '../../dinar.pipe';
import { PanierServiceService } from '../../Service/panier-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bracelet',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,RouterLink,DinarPipe,NgClass],
  templateUrl: './bracelet.component.html',
  styleUrl: './bracelet.component.css'
})
export class BraceletComponent {
  constructor(private panierService: PanierServiceService) {}
  products:Product[]=[];
  searchName:string='';
  filteredProducts:Product[]=[];

  private readonly productservice:ProductSericeService=inject(ProductSericeService);
  ngOnInit(): void {
    this.productservice.getProduts("Bracelets").subscribe(data => {this.products=data
      this.filteredProducts = data;
    
    }
    );
    
  }
  ajouterAuPanier(produit: any): void {
    this.panierService.ajouterProduit(produit);
    alert(`${produit.name} a été ajouté au panier.`);
  }
  
}
