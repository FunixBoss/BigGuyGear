import { map } from 'rxjs/operators';
import { Component, Input, OnChanges, SimpleChanges, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from '../../../../@core/models/product/product.model';
import { ImagesCarouselComponent } from '../../images-carousel.component';
import { ProductReview } from '../../../../@core/models/product/product-review.model';
import { ACCOUNT_IMAGE_DIRECTORY } from '../../../../@core/utils/image-storing-directory';

@Component({
  selector: 'ngx-product-detail-comments',
  templateUrl: './product-detail-comments.component.html',
  styles: [
		`
			i {
				font-size: 2rem;
				padding-right: 0.1rem;
				color: #b0c4de;
			}
			.filled {
				color: #FFD700;
			}
			.low {
				color: #deb0b0;
			}
			.filled.low {
				color: #ff1e1e;
			}
		`,
	],
})
export class ProductDetailCommentsComponent implements OnChanges{
  @ViewChild(ImagesCarouselComponent) carousel: ImagesCarouselComponent;

  @Input() comments
  isCommentAvailable = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.comments && this.comments) {
      this.isCommentAvailable = true;
      this.comments.map((comment: ProductReview) => {
        comment.imageUrl = ACCOUNT_IMAGE_DIRECTORY + comment.imageUrl
      })
      
    } else {
      this.isCommentAvailable = false;
    }
  }
}
