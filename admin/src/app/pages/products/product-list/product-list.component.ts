import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomProductActionComponent } from './custom/custom-product-action.component';
import { CustomProductFilterActionsComponent } from './custom/custom-product-filter-actions.component';
import { ProductService } from '../../../@core/services/product/product.service';
import { ProductCategoryService } from '../../../@core/services/product/product-category.service';
import { ProductStyleService } from '../../../@core/services/product/product-style.service';
import { ProductStyle } from '../../../@core/models/product/product-style.model';
import { ProductCategory } from '../../../@core/models/product/product-category.model';
import { CustomCategoryImageComponent } from '../product-category/custom/custom-category-image.component';
import { forkJoin, Subject } from 'rxjs';
import { PRODUCT_IMAGE_DIRECTORY } from '../../../@core/utils/image-storing-directory';
import { ProductBrand } from '../../../@core/models/product/product-brand.model';
import { ProductSale } from '../../../@core/models/sale/product-sale.model';
import { ProductBrandService } from '../../../@core/services/product/product-brand.service';
import { ProductSaleService } from '../../../@core/services/product/product-sale.service';
import { CustomProductStatusComponent } from './custom/custom-product-status.component';
import { CustomProductStatusFilterComponent } from './custom/custom-product-status-filter.component';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';

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
  categories: ProductCategory[];
  brands: ProductBrand[];
  styles: ProductStyle[];
  sales: ProductSale[];

  // for select multi
  selectedProducts: any[] = []
  settings = {
    selectMode: 'multi',
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
    private categoryService: ProductCategoryService,
    private styleService: ProductStyleService,
    private brandService: ProductBrandService,
    private saleService: ProductSaleService,
    private utilsService: UtilsService
  ) {

  }

  ngOnInit(): void {
    const categoryObservable = this.categoryService.findAll();
    const brandObservable = this.brandService.findAll();
    const styleObservable = this.styleService.findAll();
    const saleObservable = this.saleService.findAll();

    forkJoin([categoryObservable, brandObservable, styleObservable, saleObservable]).subscribe(
      ([categoryData, brandData, styleData, saleData]) => {
        this.categories = categoryData._embedded.categories;
        this.brands = brandData._embedded.productBrands;
        this.styles = styleData._embedded.productStyles;
        this.sales = saleData._embedded.productSales;

        this.settings = {
          selectMode: 'multi',
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
              width: "8%",
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
            brand: {
              title: 'Brand',
              type: 'string',
              width: "8%",
              filter: {
                type: 'list',
                config: {
                  selectText: 'Brand...',
                  list: this.brands.map(brand => {
                    return { value: brand.brandName, title: brand.brandName }
                  })
                },
              },
            },
            style: {
              title: 'Style',
              type: 'string',
              width: "8%",
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
            sale: {
              title: 'Sale',
              type: 'string',
              width: "8%",
              filter: {
                type: 'list',
                config: {
                  selectText: 'Sale...',
                  list: this.sales.map(sale => {
                    return { value: sale.saleName, title: sale.saleName }
                  })
                },
              },
            },
            totalSold: {
              title: 'Sold',
              type: 'number',
              width: '5%'
            },
            totalLikes: {
              title: 'Likes',
              type: 'number',
              width: '5%'
            },
            totalRating: {
              title: 'Rating',
              type: 'number',
              width: '5%'
            },
            status: {
              title: 'Status',
              type: 'custom',
              sort: false,
              width: "7%",
              filter: {
                type: 'custom',
                component: CustomProductStatusFilterComponent,
              },
              renderComponent: CustomProductStatusComponent,
              filterFunction : (value, query) => {
                value = JSON.parse(value)
                query = JSON.parse(query)
                const result: boolean = query.every((status) => value[status] === true);
                value = JSON.stringify(value);
                query = JSON.stringify(query);

                return result
              }
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
        const mappedProducts: any[] = data.map(pro => {
          return {
            productId: pro.productId,
            productName: pro.productName,
            category: pro.category.categoryName,
            brand: pro.productBrand.brandName,
            style: pro.productStyle.styleName,
            sale: pro.productSale.saleName,
            image: PRODUCT_IMAGE_DIRECTORY + pro.imageUrl,
            status: JSON.stringify({
              new: pro.new_,
              top: pro.top,
              active: pro.active,
              sale: pro.sale,
            }),
            totalSold: pro.totalSold,
            totalLikes: pro.totalLikes,
            totalRating: pro.totalRating,
          }
        })
        this.source.load(mappedProducts)
      })
  }

  ngAfterViewInit() {
    const pager = document.querySelector('ng2-smart-table-pager');
    pager.classList.add('d-block')
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }

  onRowSelect(event: any): void {
    this.selectedProducts = (event.selected)
    
  }

  onDelete(isDeleted: boolean) {
    if(isDeleted) {
      this.loadProducts();
      this.selectedProducts = []
      this.utilsService.updateToastState(new ToastState('Delete The Product\'s Status Successfully!', "success"))
    } else {
      this.utilsService.updateToastState(new ToastState('Delete The Product\'s Status Failed!', "danger"))
    }
  }

  onUpdateNewStatus(isUpdated: boolean) {
    if(isUpdated) {
      this.selectedProducts = []
      this.loadProducts();
      this.utilsService.updateToastState(new ToastState("Updated The Product's Status New Successfully!", "success"))
    } else {
      this.utilsService.updateToastState(new ToastState("Updated The Product's Status New Failed!", "danger"))
    }
  }

  onUpdateTopStatus(isUpdated: boolean) {
    if(isUpdated) {
      this.selectedProducts = []
      this.loadProducts();
      this.utilsService.updateToastState(new ToastState("Updated The Product's Status Top Successfully!", "success"))
    } else {
      this.utilsService.updateToastState(new ToastState("Updated The Product's Status Top Failed!", "danger"))
    }
  }

  onUpdateActiveStatus(isUpdated: boolean) {
    if(isUpdated) {
      this.selectedProducts = []
      this.loadProducts();
      this.utilsService.updateToastState(new ToastState("Updated The Product's Status Active Successfully!", "success"))
    } else {
      this.utilsService.updateToastState(new ToastState("Updated The Product's Status Active Failed!", "danger"))
    }
  }

  onAppliedSale(isAppliedSale: boolean) {
    if(isAppliedSale) {
      this.selectedProducts = []
      this.loadProducts();
      this.utilsService.updateToastState(new ToastState("Updated The Product's Sale Successfully!", "success"))
    } else {
      this.utilsService.updateToastState(new ToastState("Updated The Product's Sale Failed!", "danger"))
    }
  }

  onUpdateStatuses(isUpdated: boolean) {
    if(isUpdated) {
      this.selectedProducts = []
      this.loadProducts();
      this.utilsService.updateToastState(new ToastState("Updated Statuses Successfully!", "success"))
    } else {
      this.utilsService.updateToastState(new ToastState("Updated Statuses Failed!", "danger"))
    }
  }
}
