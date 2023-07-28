import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs'
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { ToastState, UtilsService } from "../../../@core/services/utils.service";
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { ProductStyle } from '../../../@core/models/product/product-style.model';
import { CustomStyleFilterActionsComponent } from './custom/custom-style-filter-actions.component';
import { CustomStyleActionComponent } from './custom/custom-style-action.component';
import { ProductStyleService } from '../../../@core/services/product/product-style.service';

@Component({
  selector: "ngx-product-style",
  templateUrl: "./product-style.component.html",
  styleUrls: ["./product-style.component.scss"],
})
export class ProductStyleComponent implements OnInit {
  state: string = "add"; // default
  private unsubscribe = new Subject<void>();

  selectedStyles: ProductStyle[] = []
  @ViewChild('onDeleteTemplate') deleteWindow: TemplateRef<any>;
  deleteWindowRef: NbWindowRef;

  // for loading table
  numberOfItem: number = localStorage.getItem('itemPerPage') != null ? +localStorage.getItem('itemPerPage') : 10; // default
  source: LocalDataSource = new LocalDataSource();
  settings = {
    selectMode: 'multi',
    actions: {
      edit: false,
      delete: false,
      add: false,
      columnTitle: ''
    },
    mode: "external", // when add/edit -> navigate to another url
    columns: {
      productStyleId: {
        title: "ID",
        type: "number",
      },
      styleName: {
        title: "Name",
        type: "string",
      },
      actions: {
        title: 'Actions',
        type: 'custom',
        sort: false,
        filter: {
          type: 'custom',
          component: CustomStyleFilterActionsComponent
        },
        renderComponent: CustomStyleActionComponent
      }
    },
    pager: {
      display: true,
      perPage: this.numberOfItem
    },
  };

  constructor(
    private styleService: ProductStyleService,
    private utilsService: UtilsService,
    private windowService: NbWindowService
  ) {
  }

  ngOnInit() {
    this.styleService.styleChange$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.loadStyles();
      });
    this.loadStyles()

    this.styleService.state$.subscribe((state) => {
      this.state = state;
    })
  }

  loadStyles() {
    this.styleService.findAll().subscribe(
      data => {
        const mappedStyles: any[] = data._embedded.productStyles.map(s => {
          return {
            productStyleId: s.productStyleId,
            styleName: s.styleName
          }
        })
        this.source.load(mappedStyles)
      }
    )
  }

  numberOfItemsChange() {
    localStorage.setItem('itemPerPage', this.numberOfItem.toString())
    this.source.setPaging(1, this.numberOfItem)
  }

  onRowSelect(event: any): void {
    this.selectedStyles = (event.selected) as ProductStyle[]
  }

  openDeleteWindow() {
    this.deleteWindowRef = this.windowService
      .open(this.deleteWindow, { title: `Delete Styles` });
  }

  onDeleteStyles() {
    this.styleService.deleteStyles(this.selectedStyles).subscribe(
      data => {
        this.selectedStyles = []
        this.deleteWindowRef.close()
        this.styleService.notifyStyleChange();
        this.utilsService.updateToastState(new ToastState('Delete The Styles Successfully!', "success"))
      },
      error => {
        this.utilsService.updateToastState(new ToastState('Delete The Styles Failed!', "danger"))
        console.log(error);
      }
    )
  }
}
