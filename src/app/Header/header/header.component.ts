import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ProductSericeService } from '../../Service/product-serice.service';
import { Product } from '../../Class/prouduct';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent implements OnInit {

  private readonly router: Router = inject(Router);
  private readonly productService: ProductSericeService = inject(ProductSericeService);

  AfficheProduitParName(nameProduit: any): void {
    this.productService.searchProductByName(nameProduit).subscribe(data => {
      console.log("hedhy data: ", data)
      localStorage.setItem('data', JSON.stringify(data));
      this.router.navigate(['/search']);
    })
  }
  ngOnInit(): void {
    this.productService.getProduts("").subscribe(data => console.log(data))

  }

}
