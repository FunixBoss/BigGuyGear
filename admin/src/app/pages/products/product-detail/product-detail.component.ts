import { Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../@core/models/product/product.model';
import { ProductService } from '../../../@core/services/product/product.service';
import { NbAccordionItemComponent } from '@nebular/theme';
import { UtilsService } from '../../../@core/services/utils.service';

@Component({
  selector: 'ngx-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;

  productId: string;
  product: Product;
  imagesUrls: string[]
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private utilsService: UtilsService
  ) {
    this.activatedRoute.params.subscribe(
      params => {
        this.productId = params['id']
        this.productService.findDetailById(params['id'])
          .subscribe(data => {
            if("result" in data) {
              console.error(data.message)
            } else {
              this.product = data[0] as Product
              this.imagesUrls = this.product.images.map(
                image => this.utilsService.getImageFromBase64(image.imageUrl))
            }
          })
      }
    )
  }

  onEdit() {
    this.router.navigate(['/admin/products', 'edit', this.productId])
  }

  openAll() {
    this.accordions.forEach(acc => acc.open())
  }

  collapseAll() {
    this.accordions.forEach(acc => acc.close())
  }

}
