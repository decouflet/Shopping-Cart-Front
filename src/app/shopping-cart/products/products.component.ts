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
  filteredProducts: ProductDTO[];
  categorySearch: string;
  productsIdName: { [key: string]: number } = {};
  currentIndex = 0;
  itemsPerPage = 4;
  product_search: string;

  constructor(private productService: ProductService,
              private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.productList = data;
      this.filteredProducts = this.productList;
      this.productList.forEach((product) => {
        this.productsIdName[product.name] = product.id;
      });
    });
    this.cartService.productSearch$.subscribe(product_search => {
      this.product_search = product_search;
      this.filterProducts(product_search);
    });

    this.cartService.category$.subscribe(category => {
      this.categorySearch = category;
      this.filterCategory(this.categorySearch);
      }
    );
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
    this.currentIndex = 0;
    this.categorySearch = '';
    this.product_search = '';
    this.filteredProducts = this.productList;
    this.resetProductCounts();
    this.cartService.resetTotalProducts();
  }

  resetProductCounts() {
    this.buttonShops.forEach(buttonShop => {
      buttonShop.cleanCart();
    });
  }

  get paginatedProducts() {
    return this.filteredProducts.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentIndex + this.itemsPerPage < this.filteredProducts.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  prevPage() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }

  filterProducts(searchTerm: string) {
    this.filteredProducts = this.productList.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filterCategory(category: string) {
    if (category != '') {
      this.currentIndex = 0;
      this.filteredProducts = this.productList.filter(product =>
        product['category'].toLowerCase() === category.toLowerCase()
      );
    }
  }
}
