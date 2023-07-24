import { ProductCouponService } from './../../../@core/services/product/product-coupon.service';
import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomCouponFilterActionsComponent } from "./custom/custom-coupon-filter-actions.component";
import { CustomCouponActionComponent } from "./custom/custom-coupon-action.component";
import { CustomValidator } from "../../../@core/validators/custom-validator";
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { Coupon } from '../../../@core/models/coupon/coupon.model';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: "ngx-products-coupon",
  templateUrl: "./product-coupon.component.html",
  styleUrls: ["./product-coupon.component.scss"],
})
export class ProductCouponComponent implements OnInit{
  state: string = "add"; // default
  private unsubscribe = new Subject<void>();

  // Setting for List layout
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: {
      edit: false,
      delete: false,
      add: false,
      columnTitle: ''
    },
    mode: "external", // when add/edit -> navigate to another url
    columns: {
      couponId: {
        title: "ID",
        type: "number",
        width: '3%'
      },
      code: {
        title: "Code",
        type: "string",
      },
      description: {
        title: "Description",
        type: "string",
      },
      discount: {
        title: "Discount",
        type: "string",
      },
      createdAt: {
        title: 'Start Date',
        type: 'string'
      },
      expiredAt: {
        title: 'Expired Date',
        type: 'string'
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: {
          type: 'custom',
          component: CustomCouponFilterActionsComponent
        },
        renderComponent: CustomCouponActionComponent
      }
    },
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };

  constructor(
    private couponService: ProductCouponService,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.couponService.couponChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadCoupons();
      });
    this.loadCoupons()
  }

  loadCoupons() {
    this.couponService.findAll().subscribe(
      data => {
        if ("result" in data ){ 
          console.log(data.message)
        } else {
          const mappedCoupons = data.map((coupon: any) => {
            return {
              couponId: coupon.couponId,
              code: coupon.code,
              description: coupon.description,
              discount: coupon.couponTypeId == 1 ? '$' + coupon.discount : coupon.discount + '%',
              createdAt: new DatePipe('en-US').transform(coupon.createdAt, 'dd/MM/yyyy').toString(),
              expiredAt: new DatePipe('en-US').transform(coupon.expiredAt, 'dd/MM/yyyy').toString()
            }          
          })
          this.source.load(mappedCoupons)
        }
      }
    )
  }
  
  ngOnInit() {
    this.couponService.state$.subscribe((state) => {
      this.state = state;
    });
  }

  changeCursor(): void {
    const element = document.getElementById("product-table"); // Replace 'myElement' with the ID of your element
    if (element) {
      element.style.cursor = "pointer";
    }
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }
}
