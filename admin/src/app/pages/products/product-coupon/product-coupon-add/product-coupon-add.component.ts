import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { ProductCouponService } from "../../../../@core/services/product/product-coupon.service";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { Coupon } from "../../../../@core/models/coupon/coupon.model";

@Component({
  selector: "ngx-products-coupon-add",
  templateUrl: "./product-coupon-add.component.html",
  styleUrls: ["./product-coupon-add.component.scss"],
})
export class ProductCouponAddComponent implements OnInit{
  selectedDiscountTypeAddForm;
  addCouponFormGroup: FormGroup;
  

  constructor(
    private couponService: ProductCouponService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.addCouponFormGroup = this.formBuilder.group({
      code: ['', [CustomValidator.notBlank, Validators.maxLength(20)]],
      description: ['', [CustomValidator.notBlank, Validators.maxLength(50)]],
      discountType: ['', [Validators.required]],
      discountValue: [, [Validators.required, CustomValidator.maxCouponValue]],
      startedDate: [, Validators.required],
      expiredDate: [, Validators.required]
    })
  }
  
  ngOnInit() {
    let x
  }

  submitAddCoupon() {
    console.log(this.addCouponFormGroup);
    
    if(this.addCouponFormGroup.invalid) {
      this.addCouponFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('add', 'coupon', 'danger'))
      return;
    }

    let coupon: any = new Coupon();
    coupon.code = this.addCouponFormGroup.get('code').value
    coupon.discount = this.addCouponFormGroup.get('discountValue').value
    coupon.description = this.addCouponFormGroup.get('description').value
    coupon.couponTypeId = this.addCouponFormGroup.get('discountType').value == 'Fixed' ? 1 : 2
    coupon.createdAt = new Date(this.addCouponFormGroup.get('startedDate').value)
      .toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split('/').reverse().join('-')
    coupon.expiredAt = new Date(this.addCouponFormGroup.get('expiredDate').value)
      .toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split('/').reverse().join('-')

    console.log(coupon);
    
    this.couponService.insert(coupon).subscribe(
      data => {
        if (data) {
          this.utilsService.updateToastState(new ToastState('add', 'coupon', 'success'))
          this.couponService.notifyCouponChange()
          this.addCouponFormGroup.reset()
        }
      },
      error => {
        console.log(error.error.message)
        this.utilsService.updateToastState(new ToastState('add', 'coupon', 'danger'))
      }
    )
  }
}