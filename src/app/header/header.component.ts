import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  products_count: number = 0;
  productName: string = '';
  categories: string[] = ['Electronics', 'Appliances', 'Tools'];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.products_count = count;
    });
  }

  updateProductSearch() {
    this.cartService.updateProductSearch(this.productName);
  }

  addProduct() {
    this.products_count += 1;
  }

  substractProduct() {  
    if(this.products_count > 0){
      this.products_count -= 1;
    }
  }

  selectCategory(category: string) {
    this.cartService.updateCategory(category);
  }
}
