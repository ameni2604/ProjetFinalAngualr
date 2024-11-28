import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductSericeService } from '../../Service/product-serice.service';
import { Product } from '../../Class/prouduct';
import { HeaderComponent } from "../../Header/header/header.component";
import {  NgClass, UpperCasePipe } from '@angular/common';
import { FooterComponent } from "../../Footer/footer/footer.component";
import { DinarPipe } from '../../dinar.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PanierServiceService } from '../../Service/panier-service.service';

@Component({
  selector: 'app-bracelet-selected',
  standalone: true,
  imports: [HeaderComponent, DinarPipe, FooterComponent,ReactiveFormsModule,UpperCasePipe,NgClass],
  templateUrl: './bracelet-selected.component.html',
  styleUrl: './bracelet-selected.component.css'
})
export class BraceletSelectedComponent {
  identifiant:string='';
  activatedRoute:ActivatedRoute=inject(ActivatedRoute);
  productId:Product[]=[];

  storedData: any=[];
  private readonly productservice:ProductSericeService=inject(ProductSericeService);
  comForm!:FormGroup;
  readonly fb:FormBuilder=inject(FormBuilder);
  constructor(private panierService: PanierServiceService) {}

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
    ajouterCommentaire(id: string) {
      const commentaire = {
      author: 'User 1', 
      text: this.getCom(),
      rating: 5, 
      date: new Date().toLocaleDateString() 
    };
    this.productservice.addComment(id,"Bracelets",commentaire).subscribe(
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
