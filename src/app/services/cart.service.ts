import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

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
    return this.http.delete<any>(`http://localhost:8080/api/cart/remove?id_cart=${cart_id}&id_product=${product_id}&quantity=${quantity}`);
  }

  addProduct(cart_id: number, product_id: number, quantity: number) {
    return this.http.post<any>(`http://localhost:8080/api/cart/add?id_cart=${cart_id}&id_product=${product_id}&quantity=${quantity}`, {});
  }

  deleteCart(cart_id: number) {
    return this.http.delete<any>(`http://localhost:8080/api/cart/delete?id_cart=${cart_id}`);
  }
}
