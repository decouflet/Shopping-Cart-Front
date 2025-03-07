import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  products_count: number = 0;
  productName: string = '';
  categories: string[] = ['Electronics', 'Appliances', 'Tools'];
  cartItems: { name: string, count: number, price: number }[] = [];
  private cartSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.products_count = count;
    });
    this.cartSubscription = this.cartService.getCartUpdates().subscribe(productCounts => {
      this.updateCart();
    });
  }

  updateCart() {
    this.cartItems = Object.entries(this.cartService.getProductCounts()).map(([name, details]) => ({
      name,
      count: details.count,
      price: details.price
    }));
  }

  clearCart() {
    this.cartService.cleanCart();
    this.updateCart();
    this.cartService.resetTotalProducts();
  }

  cartIsEmpty(): boolean {
    return this.cartItems.length === 0;
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

  get totalCostProducts(): number {
    return this.cartItems.reduce((total, item) => total + item.count * item.price, 0);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
