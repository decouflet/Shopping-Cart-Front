import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Head, ObservableLike } from 'rxjs';
import { ProductDTO } from 'src/app/DTOs/product';
import { HeaderComponent } from 'src/app/header/header.component';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  @ViewChild('header')
  header: HeaderComponent = new HeaderComponent;

  @Input()
  cart_create: boolean = false;

  @Output()
  productEvent = new EventEmitter<number>();

  productList: ProductDTO[];
  productsIdName: { [key: string]: number } = {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
      this.productList.forEach((product) => {
        this.productsIdName[product.name] = product.id;
      });
    });
  }

  addProduct(product_name: string) {
    this.header.addProduct();
    this.productEvent.emit(this.productsIdName[product_name]);
  }

  substractProduct(product_name: string) {
    this.header.substractProduct();
    this.productEvent.emit(this.productsIdName[product_name]);
  }

}
