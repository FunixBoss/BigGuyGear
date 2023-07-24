import { takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs'
import { Component, ViewChild, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { CustomCategoryActionComponent } from "./custom/custom-category-action.component";
import { CustomCategoryFilterActionsComponent } from "./custom/custom-category-filter-actions.component";
import { ProductCategory } from "../../../@core/models/product/product-category.model";
import { ProductCategoryService } from "../../../@core/services/product/product-category.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidator } from "../../../@core/validators/custom-validator";
import { CustomCategoryImageComponent } from "./custom/custom-category-image.component";
import { ToastState, UtilsService } from "../../../@core/services/utils.service";

@Component({
  selector: "ngx-product-category",
  templateUrl: "./product-category.component.html",
  styleUrls: ["./product-category.component.scss"],
})
export class ProductCategoryComponent implements OnInit {
  state: string = "add"; // default
  private unsubscribe = new Subject<void>();
  
  editCategoryFormGroup: FormGroup;
  // Setting for List layout
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  settings = {
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
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) {
  }
  
  ngOnInit() {
    this.categoryService.categoryChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadCategories();
      });
    this.categoryService.state$.subscribe((state) => {
      this.state = state;
    })
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.findAll().subscribe(
      data => {
        if ("result" in data) {
          console.error(data.message);
        } else {
          const mappedCategories: any[] = data.map(cate => {
            return {
              categoryId: cate.categoryId,
              image: this.utilsService.getImageFromBase64(cate.image.imageUrl),
              categoryName: cate.categoryName
            }
          })
          this.source.load(mappedCategories )
        }
      })
  }

  changeCursor(): void {
    const element = document.getElementById("product-table"); // Replace 'myElement' with the ID of your element
    if (element) {
      element.style.cursor = "pointer";
    }
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }
}
