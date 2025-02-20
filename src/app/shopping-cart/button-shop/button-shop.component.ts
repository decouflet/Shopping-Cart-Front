import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-shop',
  templateUrl: './button-shop.component.html',
  styleUrls: ['./button-shop.component.css']
})
export class ButtonShopComponent {

  @Input() cart_create: boolean = false;
  @Input() product_name: string;
  product_count: number = 0;

  @Output()
  addProductEvent = new EventEmitter<string>();

  @Output()
  substracProductEvent = new EventEmitter<string>();

  constructor() { }

  addProduct(){
    console.log(this.product_name);
    this.addProductEvent.emit(this.product_name);
    this.product_count += 1;
  }

  substracProduct(){
    this.substracProductEvent.emit(this.product_name);
    if(this.product_count > 0){
      this.product_count -= 1;
    }
  }
}
