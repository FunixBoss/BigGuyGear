import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductStyle } from "../../../../@core/models/product/product-style.model";
import { ProductStyleService } from "../../../../@core/services/product/product-style.service";

@Component({
  selector: "ngx-product-style-edit",
  templateUrl: "./product-style-edit.component.html",
  styleUrls: ["./product-style-edit.component.scss"],
})
export class ProductStyleEditComponent implements OnInit {

  editStyleFormGroup: FormGroup;

  constructor(
    private styleService: ProductStyleService,
    private formBuilder: FormBuilder,
    private utilsService: UtilsService,
  ) {
    this.editStyleFormGroup = this.formBuilder.group({
      id: [],
      name: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
    })
  }

  ngOnInit() {
    this.styleService.rowData$.subscribe((rowData) => {
      if (rowData) {
        this.editStyleFormGroup.get('id').setValue(rowData.productStyleId);
        this.editStyleFormGroup.get('name').setValue(rowData.styleName);
      }
    });
  }

  editStyle() {
    if (this.editStyleFormGroup.invalid) {
      this.editStyleFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Edit Style Failed!', 'danger'))
      return;
    }

    let style: ProductStyle = new ProductStyle()
    style.productStyleId = this.editStyleFormGroup.get('id').value
    style.styleName = this.editStyleFormGroup.get('name').value

    this.styleService.update(style).subscribe(
      data => {
        if (data) {
          this.utilsService.updateToastState(new ToastState('Edit Style Successfully!', "success"))
          this.styleService.updateHandleAndRowData('add');
          this.styleService.notifyStyleChange();
        }
      },
      error => {
        console.log(error)
        this.utilsService.updateToastState(new ToastState('Edit Style Failed!', "danger"))
      }
    )
  }

}
