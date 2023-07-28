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
export class ProductCategoryAddComponent {

  addCategoryFormGroup: FormGroup;
  uploadedFile: File

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
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.uploadedFile = inputElement.files[0];
      this.addCategoryFormGroup.get('image').setValue('uploaded')
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.uploadedFile['dataUrl'] = event.target.result;
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }

  createCategory() {
    console.log(this.addCategoryFormGroup.value);

    if (this.addCategoryFormGroup.invalid) {
      this.addCategoryFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Category Failed!', "danger"))
      return;
    }

    let category: ProductCategory = new ProductCategory()
    category.categoryName = this.addCategoryFormGroup.get('name').value

    this.categoryService.insert(category, this.uploadedFile).subscribe(
      data => {
        if (data) {
          this.reset()
          this.categoryService.notifyCategoryChange();
          this.utilsService.updateToastState(new ToastState('Add Category Successfully!', "success"))
        }
      }
    )
  }

  reset() {
    this.addCategoryFormGroup.reset();
    this.uploadedFile = null;
  }
}
