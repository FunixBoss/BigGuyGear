import { Component, OnInit } from "@angular/core";
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
  uploadedFile: File
  isSelectedFile: boolean = false;

  constructor(
    private categoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
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
        this.editCategoryFormGroup.get('id').setValue(rowData.categoryId);
        this.editCategoryFormGroup.get('name').setValue(rowData.categoryName);
        this.editCategoryFormGroup.get('image').setValue(rowData.image);
      }
    });
  }

  selectFile(event: any) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.isSelectedFile = true

      this.uploadedFile = inputElement.files[0];
      this.editCategoryFormGroup.get('image').setValue('uploaded')
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.uploadedFile['dataUrl'] = event.target.result;
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }

  editCategory() {
    if (this.editCategoryFormGroup.invalid) {
      this.editCategoryFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Edit Category Failed!', 'danger'))
      return;
    }

    let category: ProductCategory = new ProductCategory()
    category.categoryId = this.editCategoryFormGroup.get('id').value
    category.categoryName = this.editCategoryFormGroup.get('name').value

    this.categoryService.update(category, this.uploadedFile).subscribe(
      data => {
        if (data) {
          this.utilsService.updateToastState(new ToastState('Edit Category Successfully!', "success"))
          this.categoryService.updateHandleAndRowData('add');
          this.categoryService.notifyCategoryChange();
        }
      },
      error => {
        console.log(error)
        this.utilsService.updateToastState(new ToastState('Edit Category Failed!', "danger"))
      }
    )
  }

}
