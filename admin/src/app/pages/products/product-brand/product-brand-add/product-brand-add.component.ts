import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductBrandService } from "../../../../@core/services/product/product-brand.service";
import { ProductBrand } from "../../../../@core/models/product/product-brand.model";

@Component({
  selector: "ngx-product-brand-add",
  templateUrl: "./product-brand-add.component.html",
  styleUrls: ["./product-brand-add.component.scss"],
})
export class ProductBrandAddComponent {

  addBrandFormGroup: FormGroup;
  uploadedFile: File

  constructor(
    private brandService: ProductBrandService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
  ) {
    this.addBrandFormGroup = this.formBuilder.group({
      name: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
      image: [, [Validators.required]]
    })
  }

  selectFile(event: any) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.uploadedFile = inputElement.files[0];
      this.addBrandFormGroup.get('image').setValue('uploaded')
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.uploadedFile['dataUrl'] = event.target.result;
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }

  createBrand() {
    if (this.addBrandFormGroup.invalid) {
      this.addBrandFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Brand Failed!', "danger"))
      return;
    }

    let brand: ProductBrand = new ProductBrand()
    brand.brandName = this.addBrandFormGroup.get('name').value

    this.brandService.insert(brand, this.uploadedFile).subscribe(
      data => {
        if (data) {
          this.reset()
          this.brandService.notifyBrandChange();
          this.utilsService.updateToastState(new ToastState('Add Brand Successfully!', "success"))
        }
      }
    )
  }

  reset() {
    this.addBrandFormGroup.reset();
    this.uploadedFile = null;
  }
}
