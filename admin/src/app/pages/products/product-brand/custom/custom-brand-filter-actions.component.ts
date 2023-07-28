import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';
import { ProductBrandService } from '../../../../@core/services/product/product-brand.service';

@Component({
    template: `
        <button nbButton fullWidth="" status="primary" 
            (click)="onAdd()">
            <nb-icon icon="plus-square-outline"></nb-icon>
        </button>
    `,
})
export class CustomBrandFilterActionsComponent extends DefaultFilter implements OnInit, OnChanges {

    constructor(private brandService: ProductBrandService) {
        super()
    }

    onAdd() {
        this.brandService.updateHandleAndRowData('add');
    }

    ngOnInit() {let x}

    ngOnChanges(changes: SimpleChanges) {let x}
}