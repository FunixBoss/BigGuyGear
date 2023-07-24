import { style } from "@angular/animations";
import { Component, OnInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NbWindowRef, NbWindowService } from "@nebular/theme";
import { ViewCell } from "ng2-smart-table";
import { ToastState, UtilsService } from "../../../../@core/services/utils.service";
import { ProductShapeService } from "../../../../@core/services/product/product-shape.service";
import { ProductShape } from "../../../../@core/models/product/product-shape.model";
import { OrderStatusService } from "../../../../@core/services/order/order-status.service";
import { OrderService } from "../../../../@core/services/order/order.service";
import { OrderStatus } from "../../../../@core/models/order/order-status.model";
import { Order } from "../../../../@core/models/order/order.model";

@Component({
    selector: 'ngx-custom-action',
    template: `
        <div class="row ">
            <div class="col-lg-6 d-flex justify-content-center">
                <button nbButton status="primary" (click)="onGetDetail()">
                    <nb-icon icon="folder-outline"></nb-icon>
                </button>
            </div>
            <div class="col-lg-46 d-flex justify-content-center">
                <button nbButton status="warning" (click)="onEdit()">
                    <nb-icon icon="edit-2-outline"></nb-icon>
                </button>
            </div>
        </div>

        <ng-template #editOrderStatus let-data>
            <div class="d-flex flex-column" [formGroup]="editStatusFormGroup">
                <nb-select fullWidth placeholder="Order Status" formControlName="orderStatus">
                    <nb-select-label>
                        Order Status: {{ editStatusFormGroup.get('orderStatus').value['statusName'] }}
                    </nb-select-label>
                    <nb-option *ngFor="let status of orderStatuses"
                        [value]="status">{{status.statusName}}</nb-option>
                </nb-select>
                <button nbButton status="success" class="mt-3" (click)="editStatus()">
                    SAVE
                </button>
            </div>
        </ng-template>
    `,
    styles: [
        `
            button {
                padding: 0.5rem 0.7rem;
            }
            i {
                font-size: 1.2rem;
            }
        `
    ]
})

export class CustomOrderActionComponent implements ViewCell {
    renderValue: string;

    @Input() value: string | number;
    @Input() rowData: any;

    @ViewChild('editOrderStatus') editOrderStatusWindow: TemplateRef<any>;
    windowRef: NbWindowRef;
    editStatusFormGroup: FormGroup;
    orderStatuses: OrderStatus[]

    constructor(
        private windowService: NbWindowService,
        private formBuilder: FormBuilder,
        private utilsService: UtilsService,
        private orderService: OrderService,
        private orderStatusService: OrderStatusService,
        private router: Router
    ) { 
        this.editStatusFormGroup = this.formBuilder.group({
            orderStatus: [''],
        })
    }

    onGetDetail() {
        this.router.navigate(['/admin/orders', 'detail', this.rowData.orderId])
    }

    onEdit() {
        this.windowRef = this.windowService.open(
            this.editOrderStatusWindow, { title: 'Edit Order Status' },
        );
        this.orderStatusService.findAll().subscribe(data => this.orderStatuses = data)
        this.orderService.findOrderStatusById(this.rowData.orderId).subscribe(
            data => {
                this.editStatusFormGroup.get('orderStatus').setValue(data)
            }
        )
    }

    editStatus() {
        if (this.editStatusFormGroup.invalid) {
            this.editStatusFormGroup.markAllAsTouched();
            this.utilsService.updateToastState(new ToastState('edit', 'order', 'danger'))
            return;
        }
        let orderStatus: OrderStatus = this.editStatusFormGroup.value['orderStatus'] as OrderStatus
        this.orderService.updateOrderStatus(this.rowData.orderId, orderStatus).subscribe(
            data => {
                if (data.result) {
                    this.utilsService.updateToastState(new ToastState('edit', 'order', 'success'))
                    this.orderService.notifyOrderChange()
                    this.windowRef.close();
                }
            },
            error => {console.log(error);
            }
        )
    }
}