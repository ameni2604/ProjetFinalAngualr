import { Component, inject } from '@angular/core';
import { ProductSericeService } from '../../Service/product-serice.service';
import { Product } from '../../Class/prouduct';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Commentaire } from '../../Class/commentaire';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  products:Product[]=[]
  readonly productService:ProductSericeService=inject(ProductSericeService)
  productForm!:FormGroup;
  readonly fb:FormBuilder=inject(FormBuilder);
ngOnInit():void
{
  this.productService.getProduts('').subscribe(data=>this.products=data)
  this.productForm=this.fb.nonNullable.group({
  name: ['',[Validators.required, Validators.pattern(/^[A-Z][a-zA-Z]*$/)]],
  sectionName: ['', Validators.required],
  price: ['', [Validators.required, Validators.min(0)]],
  quantity: ['', [Validators.required, Validators.min(0)]],
  description: ['', Validators.required,Validators.minLength(10)],
  material: ['', Validators.required],
  weight:  ['', [Validators.required, Validators.pattern(/^\d+g$/)]],
  dimensions: ['', Validators.required],
  Images: ['', Validators.required],
  ListeDesImages: this.fb.array([]),
  color:this.fb.array([]),
  })
  
}
generateUniqueReference():string{
  let ref:string;
  const existeRef=this.products.map(product =>product.reference);
  do{
  const nouvref=Math.floor(Math.random()*1000);
  ref=`REF${nouvref}`
}while(existeRef.includes(ref))
return ref;
}
public get prodImages() {
  return this.productForm.get('ListeDesImages') as FormArray;
}
onAddImages() {
  this.prodImages.push(this.fb.control('',Validators.required));
  }
get name() {
  return this.productForm.get('name');
}
get sectionName() {
  return this.productForm.get('sectionName');
}
get price() {
  return this.productForm.get('price');
}
get quantity() {
  return this.productForm.get('quantity');
}
get description() {
  return this.productForm.get('description');
}

get material() {
  return this.productForm.get('material');
}
get weight() {
  return this.productForm.get('weight');
}

get dimensions() {
  return this.productForm.get('dimensions');
}

get Images() {
  return this.productForm.get('Images');
}

get ListeDesImages() {
  return this.productForm.get('ListeDesImages');
}

public get prodColor() {
  return this.productForm.get('color') as FormArray;
}
onAddCol() {
  this.prodColor.push(this.fb.control('',Validators.required));
  }

  onSubmit() {
    console.log(this.productForm.value);
    const productsInSameSection = this.products.filter(product => product.sectionName === this.sectionName?.value);
    
    const maxId = productsInSameSection.reduce((max, product) => {
      return Math.max(max, Number(product.id));  
    }, 0); 
    
    const newId = (maxId +1).toString();  
    
    let newprod: Product = {
      id: newId,  
      reference: this.generateUniqueReference(),
      name: this.name?.value,
      description: this.description?.value,
      price: this.price?.value,
      sectionName: this.sectionName?.value,
      material: this.material?.value,
      availability: !(Number(this.quantity?.value) <= 0),
      weight: this.weight?.value,
      dimensions: this.dimensions?.value,
      Images: this.Images?.value,
      ListeDesImages: this.prodImages?.value,
      colors: this.prodColor?.value,
      commentaire: [],
    };
  
    this.productService.addProduct(newprod).subscribe(data => {
      console.log(data);
      alert("Un produit a été ajouté.");
    });
  }
  

}
