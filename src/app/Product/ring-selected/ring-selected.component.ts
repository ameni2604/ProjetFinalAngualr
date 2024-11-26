import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../Footer/footer/footer.component";
import { HeaderComponent } from "../../Header/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Class/prouduct';
import { ProductSericeService } from '../../Service/product-serice.service';
import { CurrencyPipe } from '@angular/common';
import { DinarPipe } from '../../dinar.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanierServiceService } from '../../Service/panier-service.service';

@Component({
  selector: 'app-ring-selected',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,DinarPipe,ReactiveFormsModule],
  templateUrl: './ring-selected.component.html',
  styleUrl: './ring-selected.component.css'
})
export class RingSelectedComponent {
  identifiant:number=0;
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  productId:Product[]=[];
  comForm!:FormGroup;
  readonly fb:FormBuilder=inject(FormBuilder);
  constructor(private panierService: PanierServiceService) {}


  storedData: any=[];
  private readonly productservice:ProductSericeService=inject(ProductSericeService);
  ngOnInit(): void {
   
    this.identifiant=this.activatedRoute.snapshot.params['idn'];
    this.productservice.getProduts("").
    subscribe(
      data => this.productId=data);
      this.comForm=this.fb.nonNullable.group({
        comt :['',Validators.required]
      })
    }
    public getCom(){
      return this.comForm.get('comt')?.value;
    }
    get comt(){
      return this.comForm.get('comt');

    }
  
ajouterCommentaire(id: number) {
  const commentaire = {
  author: 'User 1', 
  text: this.getCom(),
  rating: 5, 
  date: new Date().toLocaleDateString() 
};
this.productservice.addComment(id, "Earrings",commentaire).subscribe(
  (data) => {
    console.log("commenatire ajouter avec succes:", data);
  }
  
);
}
changeMainImage(subImage: string): void {
const mainImage = document.getElementById('mainImage') as HTMLImageElement;
if (mainImage) {
  mainImage.src = subImage;
}
}
ajouterAuPanier(produit: any): void {
  this.panierService.ajouterProduit(produit);
  alert(`${produit.name} a été ajouté au panier.`);
}
}
