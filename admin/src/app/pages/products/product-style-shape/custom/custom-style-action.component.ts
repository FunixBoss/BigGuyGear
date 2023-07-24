import { style } from "@angular/animations";
import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { ViewCell } from "ng2-smart-table";
import { ProductCategoryService } from "../../../../@core/services/product/product-category.service";
import { NbWindowRef, NbWindowService } from "@nebular/theme";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ProductStyle } from "../../../../@core/models/product/product-style.model";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { ProductStyleService } from "../../../../@core/services/product/product-style.service";

@Component({
    selector: 'ngx-custom-action',
    template: `
        <div class="row no-gutters">
            <div class="col-lg-6  d-flex justify-content-center">
                <button nbButton status="warning" (click)="onEdit()">
                    <nb-icon icon="edit-2-outline"></nb-icon>
                </button>
            </div>
            <div class="col-lg-6  d-flex justify-content-center">
                <button nbButton status="danger" (click)="onDelete()">
                    <nb-icon icon="trash-outline"></nb-icon>
                </button>
            </div>
        </div>

        <ng-template #editStyle let-data>
            <div class="d-flex flex-column" [formGroup]="editStyleFormGroup">
                <input type="hidden" formControlName="productStyleId">
                <input type="text" nbInput fullWidth placeholder="Style Name" formControlName="styleName">
                <div class="alert alert-danger mt-1" 
                    *ngIf="editStyleFormGroup.get('styleName').invalid && (editStyleFormGroup.get('styleName').dirty || editStyleFormGroup.get('styleName').touched)">
                    <div *ngIf="editStyleFormGroup.get('styleName').errors['notblank']">
                        Style Name is required
                    </div>

                    <div *ngIf="editStyleFormGroup.get('styleName').errors['maxlength']">
                        Style Name must not exceed 100 characters
                    </div>
                </div>
                <button nbButton status="success" class="mt-3" (click)="ediStyle()">
                    SAVE
                </button>
            </div>
        </ng-template>

        <ng-template #onDeleteTemplate let-data>
            <nb-card>
                <nb-card-header>
                        Are you sure you want to delete this style?
                </nb-card-header>
                <nb-card-body>
                    <button nbButton status="success" class="mt-3" (click)="deleteStyle()">
                        CONFIRM
                    </button>
                </nb-card-body>
            </nb-card>
        </ng-template>
    `,
})

export class CustomStyleActionComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    windowRef: NbWindowRef;
    @ViewChild('editStyle') editStyle: TemplateRef<any>;
    editStyleFormGroup: FormGroup;

    @ViewChild('onDeleteTemplate') deleteWindow: TemplateRef<any>;
    deleteWindowRef: NbWindowRef;
    
    constructor(
        private windowService: NbWindowService,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private styleService: ProductStyleService,
        private router: Router
    ) {
        this.editStyleFormGroup = this.formBuilder.group({
            productStyleId: [],
            styleName: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
        })
    }

    ngOnInit(): void {
        if (this.rowData) {
            this.editStyleFormGroup.get('productStyleId').setValue(this.rowData.productStyleId);
            this.editStyleFormGroup.get('styleName').setValue(this.rowData.styleName);
        }
    }

    onDelete() {
        this.deleteWindowRef = this.windowService
            .open(this.deleteWindow, { title: `Delete Style` });
    }

    onEdit() {
        this.windowRef = this.windowService.open(
            this.editStyle, { title: 'Edit Style' },
        );
    }

    ediStyle() {
        if (this.editStyleFormGroup.invalid) {
            this.editStyleFormGroup.markAllAsTouched();
            this.utilsService.updateToastState(new ToastState('edit', 'style', 'danger'))
            return;
        }
        let style: ProductStyle = this.editStyleFormGroup.value as ProductStyle
        console.log(style);
        this.styleService.update(style).subscribe(
            data => {
                if(data.result) {
                    this.utilsService.updateToastState(new ToastState('edit', 'style', 'success'))
                    this.windowRef.close();
                    this.styleService.notifyStyleChange()
                }
            }
        )
    }

    deleteStyle() {
        this.styleService.delete(this.rowData.productStyleId).subscribe(
            data => {
                if (data.result) {
                    this.deleteWindowRef.close()
                    this.styleService.notifyStyleChange();
                    this.utilsService.updateToastState(new ToastState('delete', 'style', 'success'))
                } else {
                    this.utilsService.updateToastState(new ToastState('delete', 'style', 'danger'))
                }
            },
            error => {
                this.utilsService.updateToastState(new ToastState('delete', 'style', 'danger'))
                console.log(error);

            }
        )
    }


}