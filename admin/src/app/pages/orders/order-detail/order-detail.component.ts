import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../@core/models/product/product.model';
import { ProductService } from '../../../@core/services/product/product.service';
import { NbAccordionItemComponent } from '@nebular/theme';
import { Order } from '../../../@core/models/order/order.model';
import { OrderService } from '../../../@core/services/order/order.service';
import { OrderDetail } from '../../../@core/models/order/order-detail.model';

@Component({
  selector: 'ngx-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;

  orderId: string;
  data: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(
      params => {
        this.orderId = params['id']
        this.orderService.findById(+params['id']).subscribe(
          data => {
            this.data = data[0]
            console.log(this.data);
          }
        )
      }
    )
  }

  onEdit() {
    this.router.navigate(['/admin/orders', 'edit', this.orderId])
  }

  openAll() {
    this.accordions.forEach(acc => acc.open())
  }

  collapseAll() {
    this.accordions.forEach(acc => acc.close())
  }

}
