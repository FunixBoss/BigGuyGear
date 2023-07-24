import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { ProductService } from '../../../@core/services/product/product.service';
import { PaymentMethod } from '../../../@core/models/order/payment-method.model';
import { OrderStatus } from '../../../@core/models/order/order-status.model';
import { PaymentMethodService } from '../../../@core/services/order/payment-method.service';
import { OrderStatusService } from '../../../@core/services/order/order-status.service';
import { OrderService } from '../../../@core/services/order/order.service';
import { DatePipe } from '@angular/common';
import { CustomCustomerActionComponent } from './custom/custom-customer-action/custom-customer-action.component';
import { CustomCustomerImageComponent } from './custom/custom-customer-image.component';
import { AccountService } from '../../../@core/services/account/account.service';
import { UtilsService } from '../../../@core/services/utils.service';
import { CustomCustomerFilterActionsComponent } from './custom/custom-customer-filter-actions/custom-customer-filter-actions.component';
import { Subject } from 'rxjs';

@Component({
  selector: "ngx-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.scss"],
})
export class CustomerListComponent  implements OnInit, AfterViewInit {
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  // Setting for List layout
  paymentMethods: PaymentMethod[];
  orderStatuses: OrderStatus[];
  private unsubscribe = new Subject<void>();

  settings = {};

  constructor(
    private accountService: AccountService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.settings = {
      actions: {
        position: 'right',
        edit: false,
        delete: false,
        add: false,
        columnTitle: ''
      },
      columns: {
        imageUrl: {
          title: "Avatar",
          type: "custom",
          renderComponent: CustomCustomerImageComponent,
          sort: false,
          filter: false
        },
        id: {
          title: 'ID',
          type: 'number',
          width: '3%'
        },
        email: {
          title: 'Email',
          type: 'string',
        },
        fullName: {
          title: 'Full Name',
          type: 'string'
        },
        phoneNumber: {
          title: 'Phone Number',
          type: 'string',
        },
        totalOrder: {
          title: 'Total Orders',
          type: 'number',
          width: '10%'
        },
        createdAt: {
          title: 'Registration Date',
          type: 'string'
        },
        actions: {
          title: 'Actions',
          type: 'custom',
          sort: false,
          filter: {
            type: 'custom',
            component: CustomCustomerFilterActionsComponent,
          },
          renderComponent: CustomCustomerActionComponent
        }
      },
      pager: {
        display: true,
        perPage: this.numberOfItem
      },
    }
    this.accountService.accountChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadCustomers();
      });
    this.loadCustomers();
  }

  loadCustomers() {
    this.accountService.findAll().subscribe(
      data => {
        if("result" in data) {
          console.error(data)
        } else {

          console.log(data);
          
          const mappedAccounts: any[] = data.map((account: any) => {
            return {
              id: account.id,
              imageUrl: this.utilsService.getImageFromBase64(account.image?.imageUrl),
              fullName: account.fullName,
              email: account.email,
              phoneNumber: account.phoneNumber,
              createdAt:  new DatePipe('en-US').transform(account.createdAt, 'dd-MM-yyyy'),
              totalOrder: account.order != undefined ? account.order : 0
            }
          })
          this.source.load(mappedAccounts)
        }
      }
    )
  }
  ngOnInit(): void {
    let x;
  }
  
  ngAfterViewInit() {
    const pager = document.querySelector('ng2-smart-table-pager');
    pager.classList.add('d-block')
  }

  changeCursor(): void {
    const element = document.getElementById('product-table'); // Replace 'myElement' with the ID of your element
    if (element) {
      element.style.cursor = 'pointer';
    }
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }
}
