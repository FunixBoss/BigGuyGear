import { Component, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';
import { ProductCategoryService } from '../../../../@core/services/product/product-category.service';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../@core/validators/custom-validator';
import { ToastState, UtilsService } from '../../../../@core/services/utils.service';
import { ProductStyle } from '../../../../@core/models/product/product-style.model';
import { ProductStyleService } from '../../../../@core/services/product/product-style.service';
import { Router } from '@angular/router';

@Component({
    template: `
        <button nbButton fullWidth="" status="primary" (click)="openWindow()">
            <nb-icon icon="plus-square-outline"></nb-icon>
        </button>

        <ng-template #addStyle let-data>
            <div class="d-flex flex-column" [formGroup]="addStyleFormGroup">
                <input type="text" nbInput fullWidth placeholder="Style Name" formControlName="styleName">
                <div class="alert alert-danger mt-1" 
                    *ngIf="addStyleFormGroup.get('styleName').invalid && (addStyleFormGroup.get('styleName').dirty || addStyleFormGroup.get('styleName').touched)">
                    <div *ngIf="addStyleFormGroup.get('styleName').errors['notblank']">
                        Style Name is required
                    </div>

                    <div *ngIf="addStyleFormGroup.get('styleName').errors['maxlength']">
                        Style Name must not exceed 100 characters
                    </div>
                </div>
                <button nbButton status="success" class="mt-3" (click)="createStyle()">
                    CREATE
                </button>
            </div>
        </ng-template>
        
    `,
})
export class CustomStyleFilterActionsComponent extends DefaultFilter implements OnInit, OnChanges {

    @ViewChild('addStyle') addStyle: TemplateRef<any>;
    addStyleFormGroup: FormGroup;
    windowRef: NbWindowRef;
    constructor(
        private windowService: NbWindowService,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private styleService: ProductStyleService,
        private router: Router
    ) {
        super()
        this.addStyleFormGroup = this.formBuilder.group({
            styleName: ['', [CustomValidator.notBlank, Validators.maxLength(100)]],
        })
    }

    ngOnInit() { let x }

    ngOnChanges(changes: SimpleChanges) { let x }

    openWindow() {
        this.windowRef = this.windowService.open(
            this.addStyle, { title: 'Add A New Style' },
        );
    }

    createStyle() {
        if (this.addStyleFormGroup.invalid) {
            this.addStyleFormGroup.markAllAsTouched();
            this.utilsService.updateToastState(new ToastState('add', 'style', 'danger'))
            return;
        }
        let style: ProductStyle = this.addStyleFormGroup.value as ProductStyle
        console.log(style);
        this.styleService.insert(style).subscribe(
            data => {
                if(data) {
                    this.utilsService.updateToastState(new ToastState('add', 'style', 'success'))
                    this.styleService.notifyStyleChange()
                    this.addStyleFormGroup.reset();
                    this.windowRef.close();
                } else {
                    this.utilsService.updateToastState(new ToastState('add', 'style', 'danger'))
                }
            }
        )
    }
}