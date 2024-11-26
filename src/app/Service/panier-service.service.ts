import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierServiceService {

  private readonly PANIER_KEY = 'panierProduits';

  constructor() {}

  obtenirProduits(): any[] {
    const produits = localStorage.getItem(this.PANIER_KEY);
    return produits ? JSON.parse(produits) : [];
  }

  ajouterProduit(produit: any): void {
    const produits = this.obtenirProduits();
    produits.push(produit);
    this.sauvegarderProduits(produits);
  }

  supprimerProduit(index: number): void {
    const produits = this.obtenirProduits();
    produits.splice(index, 1);
    this.sauvegarderProduits(produits);
  }

  private sauvegarderProduits(produits: any[]): void {
    localStorage.setItem(this.PANIER_KEY, JSON.stringify(produits));
  }

}
