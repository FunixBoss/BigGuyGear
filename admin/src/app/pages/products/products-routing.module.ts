import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductCouponComponent } from './product-coupon/product-coupon.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ProductStyleComponent } from './product-style/product-style.component';
import { ProductSaleComponent } from './product-sale/product-sale.component';

const routes: Routes = [{
  path: '',
  component: ProductsComponent,
  children: [
    {
      path: 'list',
      component: ProductListComponent,
    },
    {
      path: 'add',
      component: ProductAddComponent,
    },
    {
      path: 'edit/:id',
      component: ProductEditComponent,
    },
    {
      path: 'detail/:id',
      component: ProductDetailComponent,
    },
    {
      path: 'category',
      component: ProductCategoryComponent,
    },
    {
      path: 'product-brand',
      component: ProductBrandComponent,
    },
    {
      path: 'coupon',
      component: ProductCouponComponent,
    },
    {
      path: 'product-sale',
      component: ProductSaleComponent,
    },
    {
      path: 'product-style',
      component: ProductStyleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }

export const routedComponents = [
  ProductsComponent,
  ProductListComponent,
  ProductAddComponent,
  ProductEditComponent,
  ProductDetailComponent,
  ProductCategoryComponent,
  ProductCouponComponent,
  ProductBrandComponent,
  ProductStyleComponent,
  ProductSaleComponent
];
