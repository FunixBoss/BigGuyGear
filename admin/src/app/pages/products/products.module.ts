import { NgModule } from '@angular/core';
import { NbAccordionModule, NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
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
import { CustomStyleActionComponent } from './product-style-shape/custom/custom-style-action.component';
import { CustomStyleFilterActionsComponent } from './product-style-shape/custom/custom-style-filter-actions.component';
import { CustomShapeActionComponent } from './product-style-shape/custom/custom-shape-action.component';
import { CustomShapeFilterActionsComponent } from './product-style-shape/custom/custom-shape-filter-actions.component';
import { ProductCategoryAddComponent } from './product-category/product-category-add/product-category-add.component';
import { ProductCategoryEditComponent } from './product-category/product-category-edit/product-category-edit.component';
import { ProductCouponAddComponent } from './product-coupon/product-coupon-add/product-coupon-add.component';
import { ProductCouponEditComponent } from './product-coupon/product-coupon-edit/product-coupon-edit.component';

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
    NbAlertModule
  ],
  declarations: [
    ...routedComponents,
    CustomProductActionComponent,
    CustomProductFilterActionsComponent,
    ImagesCarouselComponent,
    CustomCategoryActionComponent,
    CustomCategoryFilterActionsComponent,
    CustomCategoryImageComponent,
    CustomCouponActionComponent,
    CustomCouponFilterActionsComponent,
    CustomStyleActionComponent,
    CustomStyleFilterActionsComponent,
    CustomShapeActionComponent,
    CustomShapeFilterActionsComponent,
    ProductCategoryAddComponent,
    ProductCategoryEditComponent,
    ProductCouponAddComponent,
    ProductCouponEditComponent

  ],
})
export class ProductsModule { }
