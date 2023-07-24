import { Component, ViewChild, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductCategoryService } from "../../../../@core/services/product/product-category.service";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductCategory } from "../../../../@core/models/product/product-category.model";

@Component({
  selector: "ngx-product-category-add",
  templateUrl: "./product-category-add.component.html",
  styleUrls: ["./product-category-add.component.scss"],
})
export class ProductCategoryAddComponent{
  addCategoryFormGroup: FormGroup;
  // Setting for List layout

  constructor(
    private categoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.addCategoryFormGroup = this.formBuilder.group({
      name: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
      image: [, [Validators.required]]
    })
  }
  
  selectFile(event: any) {
    if(event.target.files) {
      const reader = new FileReader();
        reader.onload = (event: any) => {
            this.addCategoryFormGroup.get('image').setValue(event.target.result)
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  createCategory() {
    if(this.addCategoryFormGroup.invalid) {
      this.addCategoryFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('add', 'category', 'danger'))
      return;
    }

    let category: ProductCategory = new ProductCategory()
    category.categoryName = this.addCategoryFormGroup.get('name').value
    category.image = this.addCategoryFormGroup.get('image').value
    this.categoryService.insert(category).subscribe(
      data => {
        if(data) {
          this.utilsService.updateToastState(new ToastState('add', 'category', 'success'))
          this.addCategoryFormGroup.reset()
          this.categoryService.notifyCategoryChange();

        }
      }
    )
  }
}
