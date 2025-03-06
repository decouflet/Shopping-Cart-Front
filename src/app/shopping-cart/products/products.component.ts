import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { ProductDTO } from 'src/app/DTOs/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ButtonShopComponent } from '../button-shop/button-shop.component';

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

  @ViewChildren(ButtonShopComponent) buttonShops!: QueryList<ButtonShopComponent>;

  productList: ProductDTO[];
  productsIdName: { [key: string]: number } = {};
  currentIndex = 0;
  itemsPerPage = 4;

  constructor(private productService: ProductService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
      this.productList.forEach((product) => {
        this.productsIdName[product.name] = product.id;
      });
    });
  }

  addProduct(product_name: string) {
    this.cartService.addProductCount(1);
    this.productAddedEvent.emit(this.productsIdName[product_name]);
  }

  substractProduct(product_name: string) {
    this.cartService.subtractProductCount(1);
    this.productSubstractEvent.emit(this.productsIdName[product_name]);
  }

  cleanCart() {
    console.log('Cleaning cart en products');
    this.resetProductCounts();
    this.cartService.resetTotalProducts();
  }

  resetProductCounts() {
    this.buttonShops.forEach(buttonShop => {
      buttonShop.cleanCart();
    });
  }

  get paginatedProducts() {
    return this.productList.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentIndex + this.itemsPerPage < this.productList.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  prevPage() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }

}
