import { BRAND_IMAGE_DIRECTORY } from './../../../@core/utils/image-storing-directory';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ToastState, UtilsService } from "../../../@core/services/utils.service";
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { CustomBrandImageComponent } from './custom/custom-brand-image.component';
import { CustomBrandFilterActionsComponent } from './custom/custom-brand-filter-actions.component';
import { CustomBrandActionComponent } from './custom/custom-brand-action.component';
import { ProductBrand } from '../../../@core/models/product/product-brand.model';
import { ProductBrandService } from '../../../@core/services/product/product-brand.service';

@Component({
  selector: "ngx-product-brand",
  templateUrl: "./product-brand.component.html",
  styleUrls: ["./product-brand.component.scss"],
})
export class ProductBrandComponent implements OnInit {
  state: string = "add"; // default
  private unsubscribe = new Subject<void>();

  // for deleting multi brand
  selectedBrands: ProductBrand[] = []
  @ViewChild('onDeleteTemplate') deleteWindow: TemplateRef<any>;
  deleteWindowRef: NbWindowRef;

  // for loading table
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  settings = {
    selectMode: 'multi',
    actions: {
      edit: false,
      delete: false,
      add: false,
      columnTitle: ''
    },
    mode: "external", // when add/edit -> navigate to another url
    columns: {
      image: {
        title: "Image",
        type: "custom",
        renderComponent: CustomBrandImageComponent,
        sort: false,
        filter: false
      },
      productBrandId: {
        title: "ID",
        type: "number",
      },
      brandName: {
        title: "Name",
        type: "string",
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: {
          type: 'custom',
          component: CustomBrandFilterActionsComponent
        },
        renderComponent: CustomBrandActionComponent
      }
    },
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };

  constructor(
    private brandService: ProductBrandService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router,
    private windowService: NbWindowService
  ) {
  }

  ngOnInit() {
    this.brandService.brandChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadBrands();
      });
    this.loadBrands()

    this.brandService.state$.subscribe((state) => {
      this.state = state;
    })
  }

  loadBrands() {
    this.brandService.findAll().subscribe(
      data => {
        const mappedBrands: any[] = data._embedded.productBrands.map(b => {
          return {
            productBrandId: b.productBrandId,
            image: (b.image == null) ? "" : BRAND_IMAGE_DIRECTORY + b.image.imageUrl,
            brandName: b.brandName
          }
        })
        this.source.load(mappedBrands)
      }
    )
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }

  onRowSelect(event: any): void {
    this.selectedBrands = (event.selected) as ProductBrand[]
  }

  openDeleteWindow() {
    this.deleteWindowRef = this.windowService
      .open(this.deleteWindow, { title: `Delete Brands` });
  }

  onDeleteBrands() {
    this.brandService.deleteBrands(this.selectedBrands).subscribe(
      data => {
        if (data) {
          this.selectedBrands = []
          this.deleteWindowRef.close()
          this.brandService.notifyBrandChange();
          this.utilsService.updateToastState(new ToastState('Delete Brands Successfully!', "success"))
        } else {
          this.utilsService.updateToastState(new ToastState('Delete Brands Failed!', "danger"))
        }
      },
      error => {
        this.utilsService.updateToastState(new ToastState('Delete Brands Failed!', "danger"))
        console.log(error);
      }
    )
  }
}
