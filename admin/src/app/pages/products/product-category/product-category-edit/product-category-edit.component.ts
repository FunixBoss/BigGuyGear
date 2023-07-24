import { Component, ViewChild, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductCategoryService } from "../../../../@core/services/product/product-category.service";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductCategory } from "../../../../@core/models/product/product-category.model";

@Component({
  selector: "ngx-product-category-edit",
  templateUrl: "./product-category-edit.component.html",
  styleUrls: ["./product-category-edit.component.scss"],
})
export class ProductCategoryEditComponent implements OnInit {
  
  editCategoryFormGroup: FormGroup;
  constructor(
    private categoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.editCategoryFormGroup = this.formBuilder.group({
      id: [],
      name: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
      image: [, [Validators.required]]
    })
  }
  
  ngOnInit() {
    this.categoryService.rowData$.subscribe((rowData) => {
      if (rowData) {
        console.log(rowData);
        
        this.editCategoryFormGroup.get('id').setValue(rowData.categoryId);
        this.editCategoryFormGroup.get('name').setValue(rowData.categoryName);
        this.editCategoryFormGroup.get('image').setValue(rowData.image);
      }
    });
  }
  
  selectFile(event: any) {
    if(event.target.files) {
      const reader = new FileReader();
        reader.onload = (event: any) => {
            this.editCategoryFormGroup.get('image').setValue(event.target.result)
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  editCategory() {
    if(this.editCategoryFormGroup.invalid) {
      this.editCategoryFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('edit', 'category', 'danger'))
      return;
    }

    let category: ProductCategory = new ProductCategory()
    category.categoryId = this.editCategoryFormGroup.get('id').value
    category.categoryName = this.editCategoryFormGroup.get('name').value
    category.image = this.editCategoryFormGroup.get('image').value

    this.categoryService.update(category).subscribe(
      data => {
        if(data) {
          this.utilsService.updateToastState(new ToastState('edit', 'category', 'success'))
          this.categoryService.updateHandleAndRowData('add');
          this.categoryService.notifyCategoryChange();
        }
      },
      error => console.log(error)
    )
  }
}
