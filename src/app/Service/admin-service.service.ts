import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../Class/admin';
import { Product } from '../Class/prouduct';


const API_URL = "http://localhost:3000/products";
const API_URLAdmin="http://localhost:3000/admin"

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {

private readonly http:HttpClient=inject (HttpClient)

public getAdmin():Observable<Admin[]>
{
  return this.http.get<Admin[]>(API_URLAdmin)
}


public getProductById(id: number): Observable<Product> {
  return this.http.get<Product>(`api/products/${id}`);
}

public editProduit(id:number,p:Product):Observable<Product>
{return this.http.patch<Product>(API_URL+"/"+id,p)}



public updatePassword(id: string, updatedAdmin: any): Observable<any> {
  return this.http.put(`${API_URLAdmin}/${id}`, updatedAdmin);
}

}

