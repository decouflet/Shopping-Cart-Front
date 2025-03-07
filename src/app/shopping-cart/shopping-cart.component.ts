import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';
import { ProductsComponent } from './products/products.component';
import { ProductService } from '../services/product.service';
import { ClientService } from '../services/client.service';
import { ClientDTO } from '../DTOs/client';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(private cartService: CartService,
              private productService: ProductService,
              private clientService: ClientService
  ) { }

  public shoppingForm: FormGroup;
  public credentials: { name: string; password: string } = {
    name: '',
    password: ''
  };
  public cart_id: number = 0;
  public cart_create: boolean = false;
  public cart_clean: boolean = true;
  public clients: ClientDTO[];
  @ViewChild('products')
  products: ProductsComponent = new ProductsComponent(this.productService, this.cartService);

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data as ClientDTO[];
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.shoppingForm.controls[controlName];
    return control.invalid && control.touched;
  }

  createCart() {
    Object.values(this.shoppingForm.controls).forEach(control => {
      control.markAsTouched();
    });
    if (this.shoppingForm.valid) {
      this.credentials['name'] = this.shoppingForm.controls['name'].value;
      this.credentials["password"] = this.shoppingForm.controls['password'].value;
      this.cartService.buyCart(this.credentials, this.cart_id).subscribe((data) => {
          this.cart_id = data.id;
          this.cart_create = true;
          this.cart_clean = false;
          Swal.fire({
            title: 'Cart created',
            text: data.message,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        }
      );
    }
  }

  addProduct(product_id: number) {
    this.cartService.addProduct(this.cart_id, product_id, 1).subscribe((data) => {
    });
  }

  substractProduct(product_id: number) {
    this.cartService.removeOrDeleteProduct(this.cart_id, product_id, 1).subscribe((data) => {
    });
  }

  payCart() {
    this.cartService.payCart(this.cart_id).subscribe((data) => {
      Swal.fire({
        title: 'Cart paid',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.cleanCredentials();
      this.cleanCart();
      this.getClients();
    });
  }

  cleanCredentials() {
    this.shoppingForm.controls['name'].setValue('');
    this.shoppingForm.controls['password'].setValue('');
  }

  cleanCart() {
    this.cart_id = 0;
    this.cart_create = false;
    this.cart_clean = true;
    this.products.cleanCart();
  }

  deleteCart() {
    this.cartService.deleteCart(this.cart_id).subscribe((data) => {
      this.cleanCredentials();
      this.cleanCart();
      Swal.fire({
        title: 'Cart deleted',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });
  }

}
