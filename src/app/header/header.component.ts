import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  products_count: number = 0;

  constructor() { }

  addProduct() {
    this.products_count += 1;
  }

  substractProduct() {  
    if(this.products_count > 0){
      this.products_count -= 1;
    }
  }
}
