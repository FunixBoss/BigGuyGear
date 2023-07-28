import { takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { CustomOrderActionComponent } from './custom/custom-order-action.component';
import { CustomOrderFilterActionsComponent } from './custom/custom-order-filter-actions.component';
import { PaymentMethod } from '../../../@core/models/order/payment-method.model';
import { OrderStatus } from '../../../@core/models/order/order-status.model';
import { PaymentMethodService } from '../../../@core/services/order/payment-method.service';
import { OrderStatusService } from '../../../@core/services/order/order-status.service';
import { OrderService } from '../../../@core/services/order/order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: "ngx-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.scss"],
})
export class OrderListComponent implements OnInit, AfterViewInit {
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  // Setting for List layout
  paymentMethods: PaymentMethod[];
  orderStatuses: OrderStatus[];
  private unsubscribe = new Subject<void>();

  settings = {
    actions: {
      position: 'right',
      edit: false,
      delete: false,
      add: false,
      columnTitle: ''
    },
    columns: {},
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };


  constructor(
    private router: Router,
    private paymentMethodService: PaymentMethodService,
    private orderStatusService: OrderStatusService,
    private orderService: OrderService
  ) {
    const paymentObservable = this.paymentMethodService.findAll();
    const orderStatusObservable = this.orderStatusService.findAll();

    forkJoin([paymentObservable, orderStatusObservable]).subscribe(
      ([paymentData, orderStatusDate]) => {
        this.paymentMethods = paymentData;
        this.orderStatuses = orderStatusDate;

        this.settings = {
          actions: {
            position: 'right',
            edit: false,
            delete: false,
            add: false,
            columnTitle: ''
          },
          columns: {
            orderId: {
              title: 'ID',
              type: 'number',
              width: '3%'
            },
            customerEmail: {
              title: 'Customer Email',
              type: 'string',
            },
            totalPrice: {
              title: 'Total Price',
              type: 'string',
            },
            totalQuantity: {
              title: 'Total Quantity',
              type: 'string',
            },
            paymentMethod: {
              title: 'Payment Method',
              type: 'string',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Method...',
                  list: this.paymentMethods.map(pm => {
                    return { value: pm.paymentMethodName, title: pm.paymentMethodName }
                  }),
                },
              },
            },
            orderStatus: {
              title: 'Order Status',
              type: 'string',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Status...',
                  list: this.orderStatuses.map(status => {
                    return { value: status.statusName, title: status.statusName }
                  })
                },
              },
            },
            createdAt: {
              title: 'Created Date',
              type: 'string',
            },
            actions: {
              title: 'Actions',
              type: 'custom',
              sort: false,
              filter: {
                type: 'custom',
                component: CustomOrderFilterActionsComponent,
              },
              renderComponent: CustomOrderActionComponent
            }
          },
          pager: {
            display: true,
            perPage: this.numberOfItem
          },
        }
      }
    )

    this.orderService.orderChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadOrders();
      });
    this.loadOrders()
  }

  loadOrders() {
    this.orderService.findAll().subscribe(
      data => {
        const mappedOrders: any[] = data.map((order: any) => {
          return {
            orderId: order.orderId,
            customerEmail: order.account.accountEmail,
            totalPrice: order.totalPrice,
            totalQuantity: order.totalQuantity,
            paymentMethod: order.paymentMethod.paymentMethodName,
            orderStatus: order.orderStatus.statusName,
            createdAt: new DatePipe('en-US').transform(order.createdAt, 'dd/MM/yyyy').toString()
          }
        })
        this.source.load(mappedOrders)
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
