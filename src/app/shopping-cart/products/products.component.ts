import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductDTO } from 'src/app/DTOs/product';
import { HeaderComponent } from 'src/app/header/header.component';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @Input()
  cart_create: boolean = false;

  @Output()
  productAddedEvent = new EventEmitter<number>();

  @Output()
  productSubstractEvent = new EventEmitter<number>();

  productList: ProductDTO[];
  productsIdName: { [key: string]: number } = {};

  constructor(private productService: ProductService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
      this.productList.forEach((product) => {
        this.productsIdName[product.name] = product.id;
      });
      console.log(this.productsIdName);
    });
  }

  addProduct(product_name: string) {
    console.log("product name en products.component.ts: ", product_name);
    this.cartService.updateCartCount(1);
    this.productAddedEvent.emit(this.productsIdName[product_name]);
  }

  substractProduct(product_name: string) {
    this.productSubstractEvent.emit(this.productsIdName[product_name]);
  }

}
