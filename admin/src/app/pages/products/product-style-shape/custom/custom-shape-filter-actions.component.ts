import { Component, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../@core/validators/custom-validator';
import { ToastState, UtilsService } from '../../../../@core/services/utils.service';
import { Router } from '@angular/router';
import { ProductShapeService } from '../../../../@core/services/product/product-shape.service';
import { ProductShape } from '../../../../@core/models/product/product-shape.model';

@Component({
    template: `
        <button nbButton fullWidth="" status="primary" (click)="openWindow()">
            <nb-icon icon="plus-square-outline"></nb-icon>
        </button>

        <ng-template #addShape let-data>
            <div class="d-flex flex-column" [formGroup]="addShapeFormGroup">
                <input type="text" nbInput fullWidth placeholder="Shape Name" formControlName="shapeName">
                <div class="alert alert-danger mt-1" 
                    *ngIf="addShapeFormGroup.get('shapeName').invalid && (addShapeFormGroup.get('shapeName').dirty || addShapeFormGroup.get('shapeName').touched)">
                    <div *ngIf="addShapeFormGroup.get('shapeName').errors['notblank']">
                        Shape Name is required
                    </div>

                    <div *ngIf="addShapeFormGroup.get('shapeName').errors['maxlength']">
                        Shape Name must not exceed 100 characters
                    </div>
                </div>
                <button nbButton status="success" class="mt-3" (click)="createShape()">
                    CREATE
                </button>
            </div>
        </ng-template>
        
    `,
})
export class CustomShapeFilterActionsComponent extends DefaultFilter implements OnInit, OnChanges {

    @ViewChild('addShape') addShape: TemplateRef<any>;
    addShapeFormGroup: FormGroup;
    windowRef: NbWindowRef;
    constructor(
        private windowService: NbWindowService,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private shapeService: ProductShapeService,
        private router: Router
    ) {
        super()
        this.addShapeFormGroup = this.formBuilder.group({
            shapeName: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
        })
    }

    ngOnInit() { let x }

    ngOnChanges(changes: SimpleChanges) { let x }

    openWindow() {
        this.windowRef = this.windowService.open(
            this.addShape, { title: 'Add A New Shape' },
        );
    }

    createShape() {
        if (this.addShapeFormGroup.invalid) {
            this.addShapeFormGroup.markAllAsTouched();
            this.utilsService.updateToastState(new ToastState('add', 'shape', 'danger'))
            return;
        }
        let shape: ProductShape = this.addShapeFormGroup.value as ProductShape
        console.log(shape);
        this.shapeService.insert(shape).subscribe(
            data => {
                if(data) {
                    this.utilsService.updateToastState(new ToastState('add', 'shape', 'success'))
                    this.windowRef.close();
                    this.addShapeFormGroup.reset();
                    this.shapeService.notifyShapeChange()
                }
            }
        )
    }
}