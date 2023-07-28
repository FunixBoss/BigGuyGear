import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductStyleService } from "../../../../@core/services/product/product-style.service";
import { ProductStyle } from "../../../../@core/models/product/product-style.model";

@Component({
  selector: "ngx-product-style-add",
  templateUrl: "./product-style-add.component.html",
  styleUrls: ["./product-style-add.component.scss"],
})
export class ProductStyleAddComponent {

  addStyleFormGroup: FormGroup;

  constructor(
    private styleService: ProductStyleService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
  ) {
    this.addStyleFormGroup = this.formBuilder.group({
      name: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
    })
  }

  createStyle() {
    if (this.addStyleFormGroup.invalid) {
      this.addStyleFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Category Failed!', "danger"))
      return;
    }

    let style: ProductStyle = new ProductStyle()
    style.styleName = this.addStyleFormGroup.get('name').value

    this.styleService.insert(style).subscribe(
      data => {
        if (data) {
          this.addStyleFormGroup.reset()
          this.styleService.notifyStyleChange();
          this.utilsService.updateToastState(new ToastState('Add Style Successfully!', "success"))
        }
      }
    )
  }
}
