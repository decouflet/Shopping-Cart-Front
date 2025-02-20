import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonShopComponent } from './button-shop.component';

describe('ButtonShopComponent', () => {
  let component: ButtonShopComponent;
  let fixture: ComponentFixture<ButtonShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
