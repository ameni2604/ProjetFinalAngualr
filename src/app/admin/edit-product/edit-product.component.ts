import { Component, inject, OnInit } from '@angular/core';
import { AdminServiceService } from '../../Service/admin-service.service';
import { FormGroup,FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductSericeService } from '../../Service/product-serice.service';
import { Product } from '../../Class/prouduct';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent  implements OnInit{

private readonly adminService:AdminServiceService=inject(AdminServiceService)


private readonly produitService:ProductSericeService=inject(ProductSericeService)

produit!:Product
productId!:number
activatedRoute:ActivatedRoute=inject(ActivatedRoute)
productForm!:FormGroup
router:Router=inject(Router)

readonly fb:FormBuilder=inject(FormBuilder)
ngOnInit(): void {
  this.productForm = this.fb.nonNullable.group({
    name:['',Validators.required],
    price: [0,Validators.required],
    description:['',Validators.required,Validators.maxLength(20)],
    availability:['',Validators.required],
  });


  
  
  
  

  this.productId = Number(this.activatedRoute.snapshot.params['id']);
  this.adminService.getProductById(this.productId).subscribe((data) => {
    this.produit = data;
    this.productForm.patchValue({
      name: this.produit.name,
      price: this.produit.price,
      description: this.produit.description,
      available: this.produit.availability,
    });
  });
}

onSubmit() {

  this.adminService.editProduit(this.productId, this.productForm.value).subscribe((data) => {
    console.log(data);
    this.router.navigate(['/admin/product']);
  });
}
}
