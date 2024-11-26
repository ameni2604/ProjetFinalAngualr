import { Component,inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../Class/prouduct';
import { ProductSericeService } from '../../Service/product-serice.service';
import { FooterComponent } from '../../Footer/footer/footer.component';
import { HeaderComponent } from '../../Header/header/header.component';
import { CurrencyPipe } from '@angular/common';
import { DinarPipe } from '../../dinar.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanierServiceService } from '../../Service/panier-service.service';

@Component({
  selector: 'app-neclace-selected',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,DinarPipe,ReactiveFormsModule],
  templateUrl: './neclace-selected.component.html',
  styleUrl: './neclace-selected.component.css'
})
export class NeclaceSelectedComponent implements OnInit{

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
    this.productservice.addComment(id,"Necklaces",commentaire).subscribe(
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
