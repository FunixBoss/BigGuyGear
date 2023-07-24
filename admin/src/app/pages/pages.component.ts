import { takeUntil } from 'rxjs/operators';
import { Component } from '@angular/core';

import { MENU_ITEMS_AUTHORIZED } from './pages-menu';
import { MENU_ITEMS_UNAUTHORIZED } from './pages-menu';

import { AuthService } from '../@core/services/account/auth.service';
import { NbMenuItem } from '@nebular/theme';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[]
  private unsubscribe = new Subject<void>();

  constructor(
    public authService: AuthService
  ) {
    this.authService.authChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadMenu();
      });
    this.loadMenu()
  }

  loadMenu() {
    if (this.authService.isLoggedIn()) {
      this.menu = MENU_ITEMS_AUTHORIZED
    } else {
      this.menu = MENU_ITEMS_UNAUTHORIZED
    }
  }


}
