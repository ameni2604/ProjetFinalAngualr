import { Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ErreurComponent } from './Erreur/erreur/erreur.component';
import { RingComponent } from './Product/ring/ring.component';
import { NecklaceComponent } from './Product/necklace/necklace.component';
import { NeclaceSelectedComponent } from './Product/neclace-selected/neclace-selected.component';
import { PanierComponent } from './panier/panier.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SearchComponent } from './search/search.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { BraceletComponent } from './Product/bracelet/bracelet.component';
import { BraceletSelectedComponent } from './Product/bracelet-selected/bracelet-selected.component';
import { loginGuard } from './login.guard';
import { RingSelectedComponent } from './Product/ring-selected/ring-selected.component';
import { PageAdminComponent } from './admin/page-admin/page-admin.component';
import { ProductAdminComponent } from './admin/product-admin/product-admin.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { MotDeMasseComponent } from './admin/mot-de-passe/mot-de-masse.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';

export const routes: Routes = [
    {path:'home' , title:' Home', component:AcceuilComponent },
    {path:'ring' , title:' Ring', component:RingComponent},
    {path:'necklace' , title:' Neckklace', component:NecklaceComponent},
    {path:'bracelet' , title:' Bracelets', component:BraceletComponent},
    {path:'necklace/:idn' , title:' Necklace', component:NeclaceSelectedComponent},
    {path:'bracelet/:idn' , title:' Bracelet', component:BraceletSelectedComponent},
    {path:'ring/:idn' , title:' Bracelet', component:RingSelectedComponent},
    {path:'aboutsus' , title:'AboutUs', component:AboutusComponent},
    {path:'panier' , title:' Panier', component:PanierComponent},
    {path:'search' , title:' search', component:SearchComponent},
    {path:'verifEmail' , title:'verifier email', component:MotDeMasseComponent},
    {path:'changePassword' , title:' update password', component:ChangePasswordComponent},
    {path:'admin' , title:' ADMIN', component:PageAdminComponent, canActivate: [loginGuard],
    children:[
        {path:'product' , title:'Produit', component:ProductAdminComponent},
        {path:'addProduct' , title:'ProduitAjout', component:AddProductComponent},
        { path: 'editProduct/:id', component: EditProductComponent },

    ]
},


    {path:'login' , title:' login', component:PageLoginComponent},
    {path:'', redirectTo:'home',pathMatch:'full'},
    {path:'**' ,title:" Error" , component:ErreurComponent}


];
