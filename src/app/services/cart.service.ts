import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private productSearch = new BehaviorSubject<string>('');
  productSearch$ = this.productSearch.asObservable();

  private category = new BehaviorSubject<string>('');
  category$ = this.category.asObservable();


  private productCounts: { [key: string]: number } = {};

  constructor(private http: HttpClient) {}

  getProductCount(productName: string): number {
    return this.productCounts[productName] || 0;
  }

  addProductButton(productName: string): void {
    this.productCounts[productName] = (this.productCounts[productName] || 0) + 1;
  }

  substractProductButton(productName: string): void {
    if (this.productCounts[productName] && this.productCounts[productName] > 0) {
      this.productCounts[productName]--;
    }
  }

  updateProductSearch(productName: string): void {
    this.productSearch.next(productName);
  }

  updateCategory(category: string): void {
    this.category.next(category);
  }

  addProductCount(quantity: number) {
    this.cartCount.next(this.cartCount.value + quantity);
  }

  subtractProductCount(quantity: number) {
    const newTotal = Math.max(0, this.cartCount.value - quantity);
    this.cartCount.next(newTotal);
  }

  cleanCart(): void {
    this.productCounts = {};
  }

  resetTotalProducts() {
    this.cartCount.next(0);
  }

  buyCart(credentials: { name: string; password: string }, cart_id: number) {
    return this.http.post<any>(`http://localhost:8080/api/cart/create?cart_id=${cart_id}`, credentials);
  }

  payCart(cart_id: number) {
    return this.http.put<any>(`http://localhost:8080/api/cart/pay?id_cart=${cart_id}`, {});	
  }

  calculateCost(cart_id: number) {
    return this.http.get<any>(`http://localhost:8080/api/cart/cost?id_cart=${cart_id}`);
  }

  removeOrDeleteProduct(cart_id: number, product_id: number, quantity: number) {
    console.log(httpOptions);
    return this.http.delete<any>(`http://localhost:8080/api/cart/remove-or-delete-product?id_cart=${cart_id}&id_product=${product_id}&quantity=${quantity}`, httpOptions);
  }

  addProduct(cart_id: number, product_id: number, quantity: number) {
    return this.http.put<any>(`http://localhost:8080/api/cart/add-product?id_cart=${cart_id}&id_product=${product_id}&quantity=${quantity}`, null, httpOptions);
  }

  deleteCart(cart_id: number) {
    return this.http.delete<any>(`http://localhost:8080/api/cart/delete?id=${cart_id}`, httpOptions);
  }
}
