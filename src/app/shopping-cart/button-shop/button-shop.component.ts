import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-button-shop',
  templateUrl: './button-shop.component.html',
  styleUrls: ['./button-shop.component.css']
})
export class ButtonShopComponent {

  @Input() cart_create: boolean = false;
  @Input() product_name: string;

  @Output()
  addProductEvent = new EventEmitter<string>();

  @Output()
  substracProductEvent = new EventEmitter<string>();

  constructor(private cartService: CartService) { }

  addProduct(){
    console.log(this.product_name);
    this.addProductEvent.emit(this.product_name);
    this.cartService.addProductButton(this.product_name);
  }

  substracProduct(){
    this.substracProductEvent.emit(this.product_name);
    if(this.product_count > 0){
      this.cartService.substractProductButton(this.product_name);
    }
  }

  cleanCart(){
    this.cartService.cleanCart();
  }

  get product_count(): number {
    return this.cartService.getProductCount(this.product_name);
  }
}
