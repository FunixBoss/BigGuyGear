import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { ViewCell } from "ng2-smart-table";
import { NbWindowRef, NbWindowService } from "@nebular/theme";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CustomValidator } from "../../../../@core/validators/custom-validator";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { ProductShapeService } from "../../../../@core/services/product/product-shape.service";
import { ProductShape } from "../../../../@core/models/product/product-shape.model";

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
                <button nbButton status="danger" (click)="onDelete($event)">
                    <nb-icon icon="trash-outline"></nb-icon>
                </button>
            </div>
        </div>

        <ng-template #editShape let-data>
            <div class="d-flex flex-column" [formGroup]="editShapeFormGroup">
                <input type="hidden" formControlName="productShapeId">
                <input type="text" nbInput fullWidth placeholder="Shape Name" formControlName="shapeName">
                <div class="alert alert-danger mt-1" 
                    *ngIf="editShapeFormGroup.get('shapeName').invalid && (editShapeFormGroup.get('shapeName').dirty || editShapeFormGroup.get('shapeName').touched)">
                    <div *ngIf="editShapeFormGroup.get('shapeName').errors['notblank']">
                        Shape Name is required
                    </div>

                    <div *ngIf="editShapeFormGroup.get('shapeName').errors['maxlength']">
                        Shape Name must not exceed 100 characters
                    </div>
                </div>
                <button nbButton status="success" class="mt-3" (click)="ediShape()">
                    SAVE
                </button>
            </div>
        </ng-template>

        <ng-template #onDeleteTemplate let-data>
            <nb-card>
                <nb-card-header>
                        Are you sure you want to delete this shape?
                </nb-card-header>
                <nb-card-body>
                    <button nbButton status="success" class="mt-3" (click)="deleteShape()">
                        CONFIRM
                    </button>
                </nb-card-body>
            </nb-card>
        </ng-template>
    `,
})

export class CustomShapeActionComponent implements ViewCell, OnInit {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    windowRef: NbWindowRef;
    @ViewChild('editShape') editShape: TemplateRef<any>;
    editShapeFormGroup: FormGroup;

    @ViewChild('onDeleteTemplate') deleteWindow: TemplateRef<any>;
    deleteWindowRef: NbWindowRef;


    constructor(
        private windowService: NbWindowService,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private shapeService: ProductShapeService,
    ) {
        this.editShapeFormGroup = this.formBuilder.group({
            productShapeId: [],
            shapeName: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
        })
    }

    ngOnInit(): void {
        this.editShapeFormGroup.reset();
        if (this.rowData) {
            this.editShapeFormGroup.get('productShapeId').setValue(this.rowData.productShapeId);
            this.editShapeFormGroup.get('shapeName').setValue(this.rowData.shapeName);
        }
    }

    onDelete(event: any) {
        this.deleteWindowRef = this.windowService
            .open(this.deleteWindow, { title: `Delete Shape` });
    }

    onEdit() {
        this.windowRef = this.windowService.open(
            this.editShape, { title: 'Edit Shape' },
        );
    }

    ediShape() {
        if (this.editShapeFormGroup.invalid) {
            this.editShapeFormGroup.markAllAsTouched();
            this.utilsService.updateToastState(new ToastState('edit', 'Shape', 'danger'))
            return;
        }
        let shape: ProductShape = this.editShapeFormGroup.value as ProductShape
        this.shapeService.update(shape).subscribe(
            data => {
                if(data.result) {
                    this.utilsService.updateToastState(new ToastState('edit', 'Shape', 'success'))
                    this.windowRef.close();
                    this.shapeService.notifyShapeChange()
                }
            }
        )
    }

    deleteShape() {
        this.shapeService.delete(this.rowData.productShapeId).subscribe(
            data => {
                if (data.result) {
                    this.deleteWindowRef.close()
                    this.shapeService.notifyShapeChange();
                    this.utilsService.updateToastState(new ToastState('delete', 'shape', 'success'))
                } else {
                    this.utilsService.updateToastState(new ToastState('delete', 'shape', 'danger'))
                }
            },
            error => {
                this.utilsService.updateToastState(new ToastState('delete', 'shape', 'danger'))
                console.log(error);

            }
        )
    }
}