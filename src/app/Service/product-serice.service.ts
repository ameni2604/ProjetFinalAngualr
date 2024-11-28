import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../Class/prouduct';

const API_URL = "http://localhost:3000/products";
@Injectable({
  providedIn: 'root'
})
export class ProductSericeService {
  private readonly http: HttpClient = inject(HttpClient);
 
  public getProduts(sectionName:string): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL+"?sectionName="+sectionName);
  }


  public searchProductByName(name: string): Observable<Product[]> {
    return this.getProduts("").pipe(
      map((products: Product[]) =>
        products.filter(product =>
          product.name.toLowerCase().includes(name.toLowerCase())
        )
      )
    );
  }
  public addComment(id: string, sectionName: string, newComment: any): Observable<Product[]> {
  return this.getProduts(sectionName).pipe(
    map((products: Product[]) => {
      const product = products.find((p: Product) =>Number(p.id) === Number(id));
      if (product) {
        product.commentaire.push(newComment);
        this.http.put<Product>(`http://localhost:3000/products/${id}`,product).subscribe();
         
      }

      return products;
    })
  );
}

  
  public getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`api/products/${id}`);
  }
  public deleteProduit(id:string)
  {
    return this.http.delete(API_URL+"/"+id)
  };
  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(API_URL, product);
  }
}
