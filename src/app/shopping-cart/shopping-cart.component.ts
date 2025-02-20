import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor(private cartService: CartService) { }

  public shoppingForm: FormGroup;
  public credentials: { name: string; password: string } = {
    name: '',
    password: ''
  };
  public cart_id: number = 0;
  public cart_create: boolean = false;

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required]),
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
    console.log(product_id);
    this.cartService.addProduct(this.cart_id, product_id, 1).subscribe((data) => {
      console.log(data);
    });
  }

  substractProduct(product_id: number) {
    this.cartService.removeOrDeleteProduct(this.cart_id, product_id, 1).subscribe((data) => {
      console.log(data);
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

    });
  }

  calculateCostCart() {
    this.cartService.calculateCost(this.cart_id).subscribe((data) => {
      Swal.fire({
        title: 'Cart cost',
        text: `The cart cost is ${data.value}`,
        icon: 'info',
        confirmButtonText: 'Ok'
      });
    });
  }

  deleteCart() {
    this.cartService.deleteCart(this.cart_id).subscribe((data) => {
      this.cart_id = 0;
      this.cart_create = false;
      Swal.fire({
        title: 'Cart deleted',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });
  }

}
