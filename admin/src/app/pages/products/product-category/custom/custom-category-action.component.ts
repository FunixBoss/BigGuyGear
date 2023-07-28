import { ToastState, UtilsService } from './../../../../@core/services/utils.service';
import { style } from "@angular/animations";
import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { ViewCell } from "ng2-smart-table";
import { ProductCategoryService } from "../../../../@core/services/product/product-category.service";
import { NbWindowRef, NbWindowService } from "@nebular/theme";

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

        <ng-template #onDeleteTemplate let-data>
            <nb-card>
                <nb-card-header>
                        Are you sure you want to delete this category?
                </nb-card-header>
                <nb-card-body>
                    <button nbButton status="success" class="mt-3" (click)="deleteCategory()">
                        CONFIRM
                    </button>
                </nb-card-body>
            </nb-card>
        </ng-template>
    `,
})

export class CustomCategoryActionComponent implements ViewCell {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @ViewChild('onDeleteTemplate') deleteWindow: TemplateRef<any>;
    deleteWindowRef: NbWindowRef;

    constructor(
        private categoryService: ProductCategoryService,
        private windowService: NbWindowService,
        private utilsService: UtilsService
    ) {
    }

    onEdit() {
        this.categoryService.updateHandleAndRowData('edit', this.rowData);
    }

    onDelete() {
        this.deleteWindowRef = this.windowService
            .open(this.deleteWindow, { title: `Delete Product` });
    }

    deleteCategory() {
        this.categoryService.delete(this.rowData.categoryId).subscribe(
            data => {
                if (data) {
                    this.deleteWindowRef.close()
                    this.categoryService.notifyCategoryChange();
                    this.utilsService.updateToastState(new ToastState('Delete Category Successfully!', "success"))
                } else {
                    this.utilsService.updateToastState(new ToastState('Delete Category Failed!', "danger"))
                }
            },
            error => {
                this.utilsService.updateToastState(new ToastState('Delete Category Failed!', "danger"))
                console.log(error);
            }
        )
    }
}