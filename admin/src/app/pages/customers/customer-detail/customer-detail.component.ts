import { Component, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAccordionItemComponent } from '@nebular/theme';
import { OrderService } from '../../../@core/services/order/order.service';
import { AccountService } from '../../../@core/services/account/account.service';
import { Account } from '../../../@core/models/account/account.model';
import { UtilsService } from '../../../@core/services/utils.service';

@Component({
  selector: 'ngx-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;
  @ViewChild('avatar', { static: true }) avatar: ElementRef<HTMLImageElement>;
  accountId: string;
  account: Account;
  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private orderService: OrderService,
    private router: Router,
    public utilsService: UtilsService
  ) {
    this.activatedRoute.params.subscribe(
      params => {
        this.accountId = params['id']
        this.accountService.findById(+params['id']).subscribe(
          (data:any) => {
            this.account = data.account
            console.log(this.account);
            
            this.avatar.nativeElement.src = this.utilsService.
                  getImageFromBase64(this.account.image.imageUrl)
          }
        )
      }
    )

    
  }

  openAll() {
    this.accordions.forEach(acc => acc.open())
  }

  collapseAll() {
    this.accordions.forEach(acc => acc.close())
  }

}
