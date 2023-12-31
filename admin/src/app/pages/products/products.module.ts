import { NgModule } from '@angular/core';
import { NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { NbTabsetModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductsRoutingModule, routedComponents } from './products-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomProductActionComponent } from './product-list/custom/custom-product-action.component';
import { CustomProductFilterActionsComponent } from './product-list/custom/custom-product-filter-actions.component';
import { ImagesCarouselComponent } from './images-carousel.component';
import { CustomCategoryActionComponent } from './product-category/custom/custom-category-action.component';
import { CustomCategoryFilterActionsComponent } from './product-category/custom/custom-category-filter-actions.component';
import { CustomCouponActionComponent } from './product-coupon/custom/custom-coupon-action.component';
import { CustomCouponFilterActionsComponent } from './product-coupon/custom/custom-coupon-filter-actions.component';
import { CustomCategoryImageComponent } from './product-category/custom/custom-category-image.component';
import { ProductCategoryAddComponent } from './product-category/product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './product-category/product-category-edit/product-category-edit.component';
import { ProductCouponAddComponent } from './product-coupon/product-coupon-add/product-coupon-add.component';
import { ProductCouponEditComponent } from './product-coupon/product-coupon-edit/product-coupon-edit.component';
import { CustomBrandActionComponent } from './product-brand/custom/custom-brand-action.component';
import { CustomBrandFilterActionsComponent } from './product-brand/custom/custom-brand-filter-actions.component';
import { CustomBrandImageComponent } from './product-brand/custom/custom-brand-image.component';
import { ProductBrandAddComponent } from './product-brand/product-brand-add/product-brand-add.component';
import { ProductBrandEditComponent } from './product-brand/product-brand-edit/product-brand-edit.component';
import { CustomStyleActionComponent } from './product-style/custom/custom-style-action.component';
import { CustomStyleFilterActionsComponent } from './product-style/custom/custom-style-filter-actions.component';
import { ProductStyleAddComponent } from './product-style/product-style-add/product-style-add.component';
import { ProductStyleEditComponent } from './product-style/product-style-edit/product-style-edit.component';
import { CustomSaleFilterActionsComponent } from './product-sale/custom/custom-sale-filter-actions.component';
import { ProductSaleAddComponent } from './product-sale/product-sale-add/product-sale-add.component';
import { ProductSaleEditComponent } from './product-sale/product-sale-edit/product-sale-edit.component';
import { CustomSaleActionComponent } from './product-sale/custom/custom-sale-action.component';
import { CustomSaleActiveActionComponent } from './product-sale/custom/custom-sale-active-action.component';
import { ProductSaleMultiComponent } from './product-sale/product-sale-multi/product-sale-multi.component';
import { CustomProductStatusComponent } from './product-list/custom/custom-product-status.component';
import { CustomProductStatusFilterComponent } from './product-list/custom/custom-product-status-filter.component';
import { ProductListMultiComponent } from './product-list/product-list-multi/product-list-multi.component';
import { ProductDetailBasicComponent } from './product-detail/product-detail-basic/product-detail-basic.component';
import { ProductDetailCommentsComponent } from './product-detail/product-detail-comments/product-detail-comments.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    // for forms
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbAccordionModule,
    // forlayout
    NbCardModule,
    NbTabsetModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbListModule,
    ProductsRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    NbAlertModule,
    NgbRatingModule,
    NbFormFieldModule
  ],
  declarations: [
    ...routedComponents,
    CustomProductActionComponent,
    CustomProductFilterActionsComponent,
    CustomProductStatusComponent,
    ImagesCarouselComponent,
    CustomProductStatusFilterComponent,
    ProductListMultiComponent,

    CustomCategoryActionComponent,
    CustomCategoryFilterActionsComponent,
    CustomCategoryImageComponent,
    ProductCategoryAddComponent,
    ProductCategoryEditComponent,

    CustomBrandActionComponent,
    CustomBrandFilterActionsComponent,
    CustomBrandImageComponent,
    ProductBrandAddComponent,
    ProductBrandEditComponent,

    CustomStyleActionComponent,
    CustomStyleFilterActionsComponent,
    ProductStyleAddComponent,
    ProductStyleEditComponent,

    CustomCouponActionComponent,
    CustomCouponFilterActionsComponent,
    ProductCouponAddComponent,
    ProductCouponEditComponent,

    CustomSaleActionComponent,
    CustomSaleFilterActionsComponent,
    CustomSaleActiveActionComponent,
    ProductSaleAddComponent,
    ProductSaleEditComponent,
    ProductSaleMultiComponent,

    ProductDetailBasicComponent,
    ProductDetailCommentsComponent
  ],
})
export class ProductsModule { }
