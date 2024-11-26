import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(userName:string,password:string):Observable<boolean>
  {
    let connected =userName==="admin" && password=="admin";
    if(connected)
      localStorage.setItem('etat de connexion',"connected")
    else
      localStorage.setItem('etat de connexion',"disconnected")
    return of(connected)
  
  }

  logout(){
    localStorage.setItem('etat de connexion','disconnected')
  }
}
