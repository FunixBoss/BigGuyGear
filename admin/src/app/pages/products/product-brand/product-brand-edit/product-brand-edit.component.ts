import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductBrandService } from "../../../../@core/services/product/product-brand.service";
import { ProductBrand } from "../../../../@core/models/product/product-brand.model";

@Component({
  selector: "ngx-product-brand-edit",
  templateUrl: "./product-brand-edit.component.html",
  styleUrls: ["./product-brand-edit.component.scss"],
})
export class ProductBrandEditComponent implements OnInit {
  
  editBrandFormGroup: FormGroup;
  uploadedFile: File
  isSelectedFile: boolean = false;

  constructor(
    private brandService: ProductBrandService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
  ) {
    this.editBrandFormGroup = this.formBuilder.group({
      id: [],
      name: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
      image: [, [Validators.required]]
    })
  }
  
  ngOnInit() {
    this.brandService.rowData$.subscribe((rowData) => {
      if (rowData) {
        this.editBrandFormGroup.get('id').setValue(rowData.productBrandId);
        this.editBrandFormGroup.get('name').setValue(rowData.brandName);
        this.editBrandFormGroup.get('image').setValue(rowData.image);
      }
    });
  }
  
  selectFile(event: any) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.isSelectedFile = true

      this.uploadedFile = inputElement.files[0];
      this.editBrandFormGroup.get('image').setValue('uploaded')
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.uploadedFile['dataUrl'] = event.target.result;
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }

  editBrand() {
    if(this.editBrandFormGroup.invalid) {
      this.editBrandFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Edit Brand Failed!', "danger"))
      return;
    }

    let brand: ProductBrand = new ProductBrand()
    brand.productBrandId = this.editBrandFormGroup.get('id').value
    brand.brandName = this.editBrandFormGroup.get('name').value
    
    this.brandService.update(brand, this.uploadedFile).subscribe(
      data => {
        if(data) {
          this.utilsService.updateToastState(new ToastState('Edit Brand Successfully!', "success"))
          this.brandService.updateHandleAndRowData('add');
          this.brandService.notifyBrandChange();
        }
      },
      error => {
        console.log(error)
        this.utilsService.updateToastState(new ToastState('Edit Brand Failed!', "danger"))
      }
    )
  }
  
}
