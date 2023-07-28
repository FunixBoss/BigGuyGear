import { CATEGORY_IMAGE_DIRECTORY } from './../../../@core/utils/image-storing-directory';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { CustomCategoryActionComponent } from "./custom/custom-category-action.component";
import { CustomCategoryFilterActionsComponent } from "./custom/custom-category-filter-actions.component";
import { ProductCategory } from "../../../@core/models/product/product-category.model";
import { ProductCategoryService } from "../../../@core/services/product/product-category.service";
import { FormGroup } from "@angular/forms";
import { CustomCategoryImageComponent } from "./custom/custom-category-image.component";
import { ToastState, UtilsService } from "../../../@core/services/utils.service";
import { NbWindowRef, NbWindowService } from '@nebular/theme';

@Component({
  selector: "ngx-product-category",
  templateUrl: "./product-category.component.html",
  styleUrls: ["./product-category.component.scss"],
})
export class ProductCategoryComponent implements OnInit {
  state: string = "add"; // default
  private unsubscribe = new Subject<void>();

  editCategoryFormGroup: FormGroup;

  // for deleting multi category
  @ViewChild('onDeleteTemplate') deleteWindow: TemplateRef<any>;
  selectedCategories: ProductCategory[] = []
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
        renderComponent: CustomCategoryImageComponent,
        sort: false,
        filter: false
      },
      categoryId: {
        title: "ID",
        type: "number",
      },
      categoryName: {
        title: "Name",
        type: "string",
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: {
          type: 'custom',
          component: CustomCategoryFilterActionsComponent
        },
        renderComponent: CustomCategoryActionComponent
      }
    },
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };

  constructor(
    private categoryService: ProductCategoryService,
    private utilsService: UtilsService,
    private windowService: NbWindowService
  ) {
  }

  ngOnInit() {
    this.categoryService.categoryChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadCategories();
      });
    this.loadCategories()

    this.categoryService.state$.subscribe((state) => {
      this.state = state;
    })
  }

  loadCategories() {
    this.categoryService.findAll().subscribe(
      data => {
        const mappedCategories: any[] = data._embedded.categories.map(cate => {
          return {
            categoryId: cate.categoryId,
            image: (cate.image == null) ? "" : CATEGORY_IMAGE_DIRECTORY + cate.image.imageUrl,
            categoryName: cate.categoryName
          }
        })
        this.source.load(mappedCategories)
      }
    )
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }

  onRowSelect(event: any): void {
    this.selectedCategories = (event.selected) as ProductCategory[]
  }

  openDeleteWindow() {
    this.deleteWindowRef = this.windowService
      .open(this.deleteWindow, { title: `Delete Categories` });
  }

  onDeleteCategories() {
    this.categoryService.deleteCategories(this.selectedCategories).subscribe(
      data => {
        if (data) {
          this.selectedCategories = []
          this.deleteWindowRef.close()
          this.categoryService.notifyCategoryChange();
          this.utilsService.updateToastState(new ToastState('Delete The Categories Successfully!', "success"))
        } else {
          this.utilsService.updateToastState(new ToastState('Delete The Categories Failed!', "danger"))
        }
      },
      error => {
        this.utilsService.updateToastState(new ToastState('Delete The Categories Failed!', "danger"))
        console.log(error);
      }
    )
  }
}
