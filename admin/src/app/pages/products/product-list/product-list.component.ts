import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { CustomProductActionComponent } from './custom/custom-product-action.component';
import { CustomProductFilterActionsComponent } from './custom/custom-product-filter-actions.component';
import { ProductService } from '../../../@core/services/product/product.service';
import { ProductCategoryService } from '../../../@core/services/product/product-category.service';
import { ProductShapeService } from '../../../@core/services/product/product-shape.service';
import { ProductStyleService } from '../../../@core/services/product/product-style.service';
import { ProductColorService } from '../../../@core/services/product/product-color.service';
import { ProductShape } from '../../../@core/models/product/product-shape.model';
import { ProductStyle } from '../../../@core/models/product/product-style.model';
import { ProductCategory } from '../../../@core/models/product/product-category.model';
import { CustomCategoryImageComponent } from '../product-category/custom/custom-category-image.component';
import { NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';
import { Product } from '../../../@core/models/product/product.model';
import { forkJoin, Subject } from 'rxjs';
import { UtilsService } from '../../../@core/services/utils.service';

@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  private unsubscribe = new Subject<void>();
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  // Setting for List layout
  shapes: ProductShape[];
  styles: ProductStyle[];
  categories: ProductCategory[];

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
    private productService: ProductService,
    private router: Router,
    private categoryService: ProductCategoryService,
    private shapeService: ProductShapeService,
    private styleService: ProductStyleService,
    private colorService: ProductColorService,
    private toastService: NbToastrService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit(): void {
    // Initial load of the product list
    const shapeObservable = this.shapeService.findAll();
    const categoryObservable = this.categoryService.findAll();
    const styleObservable = this.styleService.findAll();

    
    // Combine the observables using forkJoin
    forkJoin([categoryObservable, shapeObservable, styleObservable]).subscribe(
      ([categoryData, shapeData, styleData]) => {
        if ("result" in categoryData) {
          console.error(categoryData.message);
        } else {
          this.categories = categoryData;
        }

        if ("result" in shapeData) {
          console.error(shapeData.message);
        } else {
          this.shapes = shapeData;
        }

        if ("result" in styleData) {
          console.error(styleData.message);
        } else {
          this.styles = styleData;
        }

        // after run all of them, then load settings
        this.settings = {
          actions: {
            position: 'right',
            edit: false,
            delete: false,
            add: false,
            columnTitle: ''
          },
          columns: {
            productId: {
              title: 'ID',
              type: 'number',
              width: '3%'
            },
            image: {
              title: 'Image',
              type: 'custom',
              sort: false,
              filter: false,
              renderComponent: CustomCategoryImageComponent
            },
            productName: {
              title: 'Name',
              type: 'string',
            },
            category: {
              title: 'Category',
              type: 'string',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Category...',
                  list: this.categories.map(cate => {
                    return { value: cate.categoryName, title: cate.categoryName }
                  }),
                },
              },
            },
            shape: {
              title: 'Shape',
              type: 'string',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Shape...',
                  list: this.shapes.map(shape => {
                    return { value: shape.shapeName, title: shape.shapeName }
                  }),
                },
              },
            },
            style: {
              title: 'Style',
              type: 'string',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Style...',
                  list: this.styles.map(style => {
                    return { value: style.styleName, title: style.styleName }
                  })
                },
              },
            },
            quantitySold: {
              title: 'Sold',
              type: 'number',
              width: '5%'
            },
            totalLikes: {
              title: 'Likes',
              type: 'number',
              width: '5%'
            },
            rating: {
              title: 'Rating',
              type: 'number',
              width: '3%'
            },
            actions: {
              title: 'Actions',
              type: 'custom',
              sort: false,
              filter: {
                type: 'custom',
                component: CustomProductFilterActionsComponent,
              },
              renderComponent: CustomProductActionComponent
            }
          },
          pager: {
            display: true,
            perPage: this.numberOfItem
          },
        };
      },
      (error: any) => {
        console.error("Error:", error);
      }
    );

    this.productService.productChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadProducts();
      });
    this.loadProducts();
  }

  loadProducts() {
    this.productService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          const mappedProducts: any[] = (data as Product[]).map(pro => {
            return {
              productId: pro.productId,
              productName: pro.productName,
              isHide: pro.isHide,
              category: pro.category.categoryName,
              shape: pro.productShape.shapeName,
              style: pro.productStyle.styleName,
              image: (pro.images != undefined) ? this.utilsService.getImageFromBase64(pro.images[0].imageUrl) : 'assets/images/default-product.png',
              quantitySold: pro.quantitySold,
              totalLikes: pro.totalLikes,
              rating: pro.rating
            }
          })
          this.source.load(mappedProducts)
        }
      })
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
