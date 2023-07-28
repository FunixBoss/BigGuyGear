import { Component, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';
import { ProductStyleService } from '../../../../@core/services/product/product-style.service';

@Component({
    template: `
        <button nbButton fullWidth="" status="primary" 
            (click)="onAdd()">
            <nb-icon icon="plus-square-outline"></nb-icon>
        </button>
    `,
})
export class CustomStyleFilterActionsComponent extends DefaultFilter implements OnInit, OnChanges {

    constructor(private styleService: ProductStyleService) {
        super()
    }

    onAdd() {
        this.styleService.updateHandleAndRowData('add');
    }

    ngOnInit() {let x}

    ngOnChanges(changes: SimpleChanges) {let x}
}