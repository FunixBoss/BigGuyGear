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
  selector: "ngx-products-coupon-edit",
  templateUrl: "./product-coupon-edit.component.html",
  styleUrls: ["./product-coupon-edit.component.scss"],
})
export class ProductCouponEditComponent implements OnInit{
  editCouponFormGroup: FormGroup;
  
  // Setting for List layout


  constructor(
    private couponService: ProductCouponService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.editCouponFormGroup = this.formBuilder.group({
      id: [],
      code: ['', [CustomValidator.notBlank, Validators.maxLength(20)]],
      description: ['', [CustomValidator.notBlank, Validators.maxLength(50)]],
      discountType: ['', [Validators.required]],
      discountValue: [, [Validators.required, CustomValidator.maxCouponValue]],
      startedDate: [, Validators.required],
      expiredDate: [, Validators.required]
    })
  }
  
  ngOnInit() {
    // receive data when edit 
    this.couponService.rowData$.subscribe((rowData) => {
      if(rowData) {
        console.log(rowData);
        this.editCouponFormGroup.get('id').setValue(rowData.couponId)
        this.editCouponFormGroup.get('code').setValue(rowData.code)
        this.editCouponFormGroup.get('description').setValue(rowData.description)
        if(rowData.discount.toString().indexOf('%') > -1 ) {
          this.editCouponFormGroup.get('discountType').setValue('Percent')
          this.editCouponFormGroup.get('discountValue').setValue(+rowData.discount.toString().slice(0, -1))
        } else {
          this.editCouponFormGroup.get('discountType').setValue('Fixed')
          this.editCouponFormGroup.get('discountValue').setValue(+rowData.discount.toString().slice(1))
        }
        this.editCouponFormGroup.get('startedDate')
          .setValue(this.utilsService.parseStringToDate(rowData.createdAt.toString()))
        this.editCouponFormGroup.get('expiredDate')
          .setValue(this.utilsService.parseStringToDate(rowData.expiredAt.toString()))
      }
    });
  }

  submitEditCoupon() {
    if(this.editCouponFormGroup.invalid) {
      this.editCouponFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('edit', 'coupon', 'danger'))
      return;
    }

    let coupon: any = new Coupon();
    coupon.couponId = this.editCouponFormGroup.get('id').value
    coupon.code = this.editCouponFormGroup.get('code').value
    coupon.discount = this.editCouponFormGroup.get('discountValue').value
    coupon.description = this.editCouponFormGroup.get('description').value
    coupon.couponTypeId = this.editCouponFormGroup.get('discountType').value == 'Fixed' ? 1 : 2
    coupon.createdAt = new Date(this.editCouponFormGroup.get('startedDate').value)
      .toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split('/').reverse().join('-')
    coupon.expiredAt = new Date(this.editCouponFormGroup.get('expiredDate').value)
      .toLocaleDateString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
      .split('/').reverse().join('-')

    console.log(coupon);
    this.couponService.update(coupon).subscribe(
      data => {
        if(data.result) {
          this.utilsService.updateToastState(new ToastState('edit', 'coupon', 'success'))
          this.couponService.updateHandleAndRowData('add');
          this.couponService.notifyCouponChange();
        } else {
          this.utilsService.updateToastState(new ToastState('edit', 'coupon', 'danger'))
        }
      }, 
      error => {
        this.utilsService.updateToastState(new ToastState('edit', 'coupon', 'danger'))
        console.log(error)
      }
    )
  }
}
